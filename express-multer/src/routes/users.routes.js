const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const upload = require("../middleware/upload.middleware");
const uniqueEmail = require("../middleware/uniqueEmail.middleware");
const cloudinary = require("../config/cloudinary.config");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

router.post(
  "/signup",
  upload.single("profile"),
  uniqueEmail,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Profile image is required" });
      }

      const { name, email, password } = req.body;

      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`
      );

      const data = await fs.readFile(dbPath, "utf-8");
      const users = JSON.parse(data);

      const newUser = {
        id: users.length + 1, // simple auto-increment ID
        name,
        email,
        password,
        profilePic: result.secure_url,
      };

      users.push(newUser);

      await fs.writeFile(dbPath, JSON.stringify(users, null, 2));

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
