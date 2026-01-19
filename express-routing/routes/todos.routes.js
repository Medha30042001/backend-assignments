const express = require("express");
const fs = require("fs/promises");

const _route = express.Router();

const readTodos = async () => {
  const rawData = await fs.readFile("./db.json", "utf-8");
  return JSON.parse(rawData);
};

const writeTodos = async (data) => {
  await fs.writeFile("db.json", JSON.stringify(data, null, 2));
};

_route.get("/", async (req, res) => {
  try {
    const data = await readTodos();
    res.status(200).json({
      message: "todos fetched",
      todos: data.todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "todos not found",
    });
  }
});

_route.get("/:todoId", async (req, res) => {
  try {
    const data = await readTodos();
    const todos = data.todos;
    const idToFetch = Number(req.params.todoId)

    const index = todos.findIndex(u => u.id === idToFetch)
    res.status(200).json({
      message: "todos fetched",
      todos: todos[index],
    });
  } catch (error) {
    res.status(500).json({
      error: "todos not found",
    });
  }
});

_route.post("/", async (req, res) => {
  try {
    const data = await readTodos();
    const todos = data.todos;
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    let newTodos = {
      id: newId,
      name: req.body.name,
      age: req.body.age,
    };

    todos.push(newTodos);

    await writeTodos(data);
    res.status(201).json({
      message: "New todo added",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "todos not found",
    });
  }
});

_route.put("/:todoId", async (req, res) => {
  try {
    const data = await readTodos();
    const idToUpdate = Number(req.params.todoId);
    const { name, age } = req.body;
    const todos = data.todos;

    const index = todos.findIndex((u) => u.id === idToUpdate);

    todos[index] = {
      ...todos[index],
      ...(name && { name }),
      ...(age && { age }),
    };

    await writeTodos(data);
    res.status(200).json({
      message: "todo Updated",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      error: "todos not found",
    });
  }
});

_route.delete("/:todoId", async (req, res) => {
  try {
    const data = await readTodos();
    const todos = data.todos;
    const idToDelete = Number(req.params.todoId);
    const filteredtodos = todos.filter((u) => u.id !== idToDelete);

    if (filteredtodos.length === todos.length) {
      return res.status(404).json({
        message: "todo not found",
      });
    }

    data.todos = filteredtodos;
    await writeTodos(data);
    res.status(200).json({
      message: "todo deleted successfully",
      todos: filteredtodos,
    });
  } catch (error) {
    res.status(500).json({
      error: "todos not found",
    });
  }
});

module.exports = _route;
