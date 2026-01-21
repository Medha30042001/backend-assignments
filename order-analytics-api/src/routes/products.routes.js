import express from "express";
import { readDB } from "../models/db";

const router = express.Router();

router.push("/", async (req, res) => {
  try {
    const db = await readDB();
    const products = db.products;
    const {name, price, stock} = req.body;

    if(!name || !price || !stock){
        return res.status(400).json({ error : 'Invalid product' });
    }

    const newProduct = {
      id : Date.now(),
      name, 
      price, 
      stock
    };

    db.products.push(newProduct);
    res.status(200).json({
        message : 'Product created',
        product : newProduct
    })
  } catch (error) {
    res.staatus(500).json({
        error : 'Server error'
    })
  }
});

router.get("/", async (req, res) => {
  try {
    const db = await readDB();
    res.status(200).json({
      products: db.products,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not fetch products",
    });
  }
});

export default router;
