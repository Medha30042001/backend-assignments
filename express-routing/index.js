const express = require("express");
const userRoutes = require("./routes/user.routes.js");
const todoRoutes = require("./routes/todos.routes.js");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
