import "dotenv/config";

import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
