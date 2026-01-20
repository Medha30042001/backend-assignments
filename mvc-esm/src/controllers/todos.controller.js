import { readTodos, writeTodos } from "../models/todos.model.js";

export const getAllTodos = async (req, res) => {
  try {
    const data = await readTodos();
    res.status(200).json({
      message: "Todos fetched",
      todos: data.todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not fetch todos",
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const data = await readTodos();
    const idToFetch = Number(req.params.id);
    const todo = data.todos.find((t) => t.id === idToFetch);

    if (!todo) {
      return (res.status(404), json({ error: "Todo not found" }));
    }
    res.status(200).json({
      message: "Requested todo fetched",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not fetch the requested todo",
    });
  }
};

export const createTodo = async (req, res) => {
  try {
    const data = await readTodos();
    const newId =
      data.todos.length > 0 ? data.todos[data.todos.length - 1].id + 1 : 1;

    const newTodo = {
      id: newId,
      title: req.body.title,
    };

    data.todos.push(newTodo);

    await writeTodos(data);

    res.status(201).json({
      message: "Created new todo successfully",
      todos: data.todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not create todo",
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const data = await readTodos();
    const idToUpdate = Number(req.params.id);
    const { title } = req.body;
    const index = data.todos.findIndex((t) => t.id === idToUpdate);
    if (index === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }
    data.todos[index] = {
      ...data.todos[index],
      ...(title && { title }),
    };

    await writeTodos(data);

    res.status(200).json({
      message: "Updated todo successfully",
      todos: data.todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not update todo",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const data = await readTodos();
    const idToDelete = Number(req.params.id);

    const filteredTodos = data.todos.filter((t) => t.id !== idToDelete);
    data.todos = filteredTodos;
    await writeTodos(data);

    res.status(200).json({
      message: "Todo deleted successfully",
      todos: data.todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not delete todo",
    });
  }
};
