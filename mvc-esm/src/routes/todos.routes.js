import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/todos.controller.js";
import rateLimit from "../middleware/ratelimit.middleware.js";
import validateTodo from "../middleware/validateTodo.middleware.js";

const router = express.Router();

router.get("/", rateLimit, getAllTodos);
router.get("/:id", getTodoById);
router.post("/add", validateTodo, createTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
