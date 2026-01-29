import { validateTodo } from "../../validations/validateTodo.js";
import pool from "../config/db.js";

export const createTodo = async (req, res) => {
    const error = validateTodo(req.body);
    if(error) return res.status(400).json({error})
  const { title, description, userId } = req.body;
  try {
    const user = await pool.query(`SELECT * FROM users1 WHERE id = $1`, [
      userId,
    ]);
    if (user.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await pool.query(
      `INSERT INTO todos(title, description, user_Id)
            VALUES ($1, $2, $3) RETURNING *`,
      [title, description, userId],
    );
    res.status(201).json({
      message: "Todo created",
      todo: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getUserTodo = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await pool.query(`SELECT * FROM users1 WHERE id = $1`, [
      userId,
    ]);
    if (user.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const result = await pool.query(`SELECT * FROM todos WHERE user_id = $1`, [
      userId,
    ]);

    res.status(200).json({
      message: "Todo of requested user fetched",
      todo: result.rows,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, is_completed } = req.body;
  try {
    const result = await pool.query(
      `UPDATE todos
            SET title = COALESCE($1, title),
                description = COALESCE($2, description),
                is_completed = COALESCE($3, is_completed)
            WHERE id = $4
            RETURNING * `,
      [title, description, is_completed, todoId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({
      message: "Todo updated",
      todo: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM todos WHERE id = $1 RETURNING *`,
      [todoId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
