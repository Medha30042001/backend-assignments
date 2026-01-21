import express from "express";
import { readDB } from "../models/db";

const router = express.Router();

router.get("/allorders", async (req, res) => {
  try {
    const db = await readDB();
    const orders = [];
    db.orders.forEach((o) => orders.push(o));

    res.status(200).json({
      message: "Fetched all orders",
      orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch data" });
  }
});

router.get("/cancelled-orders", async (req, res) => {
  try {
    const db = await readDB();
    const cancelledOrders = db.orders.filter((o) => o.status === "cancelled");

    res.status(200).json({
      message: "Fetched cancelled orders",
      orders: cancelledOrders,
      count: cancelledOrders.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch data" });
  }
});

router.get("/shipped", async (req, res) => {
  try {
    const db = await readDB();
    const shippedOrders = db.orders.filter((o) => o.status === "shipped");

    res.status(200).json({
      message: "Fetched shipped orders",
      orders: shippedOrders,
      count: shippedOrders.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch data" });
  }
});

router.get("/total-revenue/:productId", async (req, res) => {
  try {
    const db = await readDB();
    const pId = Number(req.params.productId);
    const product = db.product.find((p) => p.id === pId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const revenue = db.orders
      .filter((o) => o.productId === product.id && o.status !== "cancelled")
      .reduce((sum, o) => sum + o.quality * product.price, 0);

    res.status(200).json({
      productId: product.id,
      totalRevenue: revenue,
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch data" });
  }
});

router.get("/alltotalrevenue", async (req, res) => {
  try {
    const db = await readDB();

    const totalRevenue = db.orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => {
        const product = db.products.find((p) => pid === o.productId);
        return sum + o.quality * product.price;
      }, 0);

    res.status(200).json({
      message: "Fetched total revenue",
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch data" });
  }
});

export default router;
