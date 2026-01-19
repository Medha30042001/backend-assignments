const express = require("express");
const fs = require("fs/promises");

const _route = express.Router();

const readUser = async () => {
  const rawData = await fs.readFile("./db.json", "utf-8");
  return JSON.parse(rawData);
};

const writeUser = async (data) => {
  await fs.writeFile("db.json", JSON.stringify(data, null, 2));
};

_route.get("/", async (req, res) => {
  try {
    const data = await readUser();
    res.status(200).json({
      message: "Users fetched",
      users: data.users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Users not found",
    });
  }
});

_route.get("/:userId", async (req, res) => {
  try {
    const data = await readUser();
    const users = data.users;
    const idToFetch = Number(req.params.userId)

    const index = users.findIndex(u => u.id === idToFetch)
    res.status(200).json({
      message: "Users fetched",
      users: users[index],
    });
  } catch (error) {
    res.status(500).json({
      error: "Users not found",
    });
  }
});

_route.post("/add", async (req, res) => {
  try {
    const data = await readUser();
    const users = data.users;
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    let newUser = {
      id: newId,
      name: req.body.name,
      age: req.body.age,
    };

    users.push(newUser);

    await writeUser(data);
    res.status(201).json({
      message: "New user added",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Users not found",
    });
  }
});

_route.put("/:userId", async (req, res) => {
  try {
    const data = await readUser();
    const idToUpdate = Number(req.params.userId);
    const { name, age } = req.body;
    const users = data.users;

    const index = users.findIndex((u) => u.id === idToUpdate);

    users[index] = {
      ...users[index],
      ...(name && { name }),
      ...(age && { age }),
    };

    await writeUser(data);
    res.status(200).json({
      message: "User Updated",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Users not found",
    });
  }
});

_route.delete("/:userId", async (req, res) => {
  try {
    const data = await readUser();
    const users = data.users;
    const idToDelete = Number(req.params.userId);
    const filteredUsers = users.filter((u) => u.id !== idToDelete);

    if (filteredUsers.length === users.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    data.users = filteredUsers;
    await writeUser(data);
    res.status(200).json({
      message: "User deleted successfully",
      users: filteredUsers,
    });
  } catch (error) {
    res.status(500).json({
      error: "Users not found",
    });
  }
});

module.exports = _route;
