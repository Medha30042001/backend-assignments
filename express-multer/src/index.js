const express = require("express");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
