const express = require("express");
const fs = require("fs/promises");
const ratelimitMiddleWare = require("../middleware/ratelimit.middleware.js");
const validateTodos = require("../middleware/validateTodo.middleware.js");

const _route = express.Router();

const readTodos = async () => {
  const rawData = await fs.readFile("./db.json", "utf-8");
  return JSON.parse(rawData);
};

const writeTodos = async (data) => {
  await fs.writeFile("./db.json", JSON.stringify(data, null, 2));
};

_route.get("/", ratelimitMiddleWare, async (req, res) => {
  try {
    const data = await readTodos();

    res.status(200).json({
      message: "Todos fetched",
      todos: data.todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Todos cannot be fetched",
    });
  }
});

_route.get("/:id", async (req, res) => {
  try {
    const data = await readTodos();
    const todos = data.todos;
    const idToFetch = Number(req.params.id);

    const index = todos.findIndex((t) => t.id === idToFetch);

    res.status(200).json({
      message: "Fetched the requested todo",
      todo: todos[index],
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not find the requested todo",
    });
  }
});

_route.post("/add", validateTodos, async (req, res) => {
  try {
    const data = await readTodos();
    const todos = data.todos;
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const newTodos = {
      id: newId,
      title: req.body.title,
    };

    todos.push(newTodos);

    await writeTodos(data);

    res.status(201).json({
      message: "Todos posted",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not post new todos",
    });
  }
});

_route.put("/update/:id", async (req, res) => {
  try {
    const data = await readTodos();
    const todos = data.todos;
    const idToUpdate = Number(req.params.id);
    const { title } = req.body;

    const index = todos.findIndex((t) => t.id === idToUpdate);

    todos[index] = {
      ...todos[index],
      ...(title && { title })
    };

    await writeTodos(data);

    res.status(200).json({
      message: "todos updated",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not update todos",
    });
  }
});

_route.delete("/delete/:id", async (req, res) => {
  try {
    const data = await readTodos();
    const todos = data.todos;
    const idToDelete = Number(req.params.id);

    const filteredTodos = todos.filter((t) => t.id !== idToDelete);

    if (filteredTodos.length === todos.length) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    data.todos = filteredTodos;

    await writeTodos(data);

    res.status(200).json({
      message: "Toods deleted successfully",
      filteredTodos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not delete todos",
    });
  }
});

module.exports = _route;
