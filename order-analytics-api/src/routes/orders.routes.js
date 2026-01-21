import express from "express";
import { readDB, writeDB } from "../models/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const db = await readDB();
    const { productId, quantity } = req.body;

    const product = db.products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (product.stock === 0 || quantity > product.stock) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    const newOrder = {
      id: Date.now(),
      productId,
      quantity,
      totalAmount: quantity * product.price,
      status: "placed",
      createdAt: new Date().toISOString().split("T")[0],
    };

    product.stock -= quantity;
    db.orders.push(newOrder);

    await writeDB(db);

    res.status(201).json({
      message: "Order placed",
      newOrder,
    });
  } catch (error) {
    res.status(500).json({
      error: "Order creation failed",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const db = await readDB();

    res.status(200).json({
      orders: db.orders,
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

router.delete("/:orderId", async (req, res) => {
  try {
    const db = await readDB();
    const idToDelete = Number(req.params.orderId);
    const orders = db.orders;
    const order = orders.find((o) => o.id === idToDelete);

    if(!order) return res.status(404).json({error: 'Order not found'})
    if(order.status === 'cancelled'){
        return res.status(400).json({error : 'Order cancelled once already'})
    }

    order.status = "cancelled";

    const today = new Date().toISOString().split("T")[0];
    if (order.createdAt !== today) {
      return res.status(400).json({ error: "Cannot cancel anymore" });
    }

    const product = db.products.find(p => p.id === order.productId);
    product.stock += order.quantity;

    await writeDB(db);

    res.status(200).json({
      message: "Order cancelled",
      order
    });
  } catch (error) {
    res.status(500).json({
        error : 'Order not cancelled'
    })
  }
});

router.patch("/change-status/:orderId", async (req, res) => {
    try {
        const db = await readDB();
        const idToPatch = Number(req.params.orderId);
        const order = db.orders.find(o => o.id === idToPatch);

        if(!order) {return res.status(404).json({error : 'Order not found'})};

        if(order.status === 'cancelled' || order.status === 'delivered'){
            return res.status(400).json({error : 'Cannot change order status'});
        }

        const flow = ['placed', 'shipped', 'delivered'];
        const currentIndex = flow.indexOf(order.status);
        order.status = flow[currentIndex + 1];

        await writeDB(db);

        res.status(200).json({
            message : 'Status updated',
            order
        })
    } catch (error) {
        res.status(500).json({
            error : 'Could not update order'
        })
    }
});

export default router;
