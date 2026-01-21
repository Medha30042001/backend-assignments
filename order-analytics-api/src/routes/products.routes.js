import express from "express";
import { readDB, writeDB } from "../models/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Req body : ", req.body);

  try {
    const db = await readDB();
    const { name, price, stock } = req.body;

    if (!name || price <= 0 || stock < 0) {
      return res.status(400).json({ error: "Invalid product" });
    }

    const newProduct = {
      id: Date.now(),
      name,
      price,
      stock,
    };

    db.products.push(newProduct);
    await writeDB(db);

    res.status(201).json({
      message: "Product created",
      products: db.products,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
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
