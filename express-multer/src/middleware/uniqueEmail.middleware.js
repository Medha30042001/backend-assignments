const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const uniqueEmail = async (req, res, next) => {
  const { email } = req.body;

  const data = await fs.readFile(dbPath, "utf-8");
  const users = JSON.parse(data);

  const exists = users.find((user) => user.email === email);

  if (exists) {
    return res.status(409).json({
      error: "Email already exists",
    });
  }

  next();
};

module.exports = uniqueEmail;
