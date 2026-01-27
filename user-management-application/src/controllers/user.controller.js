import { validateUser } from "../validations/validateUser.js";
import pool from "../config/db.js";

export const createUser = async (req, res) => {
  const error = validateUser(req.body);
  if (error) res.status(400).json({ error });

  const { name, email, password, age, role } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users(name, email, password, age, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, age, role],
    );

    res.status(201).json({
      message: "User added successfully",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    res.status(200).json({
      message: "Users Fetched",
      users: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User Found",
      user: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, age, role } = req.body;
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `UPDATE users 
        SET name = COALESCE($1, name), 
            email = COALESCE($2, email), 
            password = COALESCE($3, password), 
            age = COALESCE($4, age), 
            role = COALESCE($5, role) 
        WHERE id = $6 
        RETURNING *`,
      [name, email, password, age, role, userId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "Updated user",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [userId],
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
