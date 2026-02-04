import supabase from "../config/supabase.config.js";
import { validateUser } from "../validations/user.validate.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const err = validateUser(req.body);
    if (err) return res.status(400).json({ error: err });

    const { name, email, age, location, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
      .from("users2")
      .insert([{ name, email, age, location, password: hashedPassword }])
      .select("name, email, age, location")
      .single();

    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({ error: "Email must be unique" });
      }
      return res.status(500).json({ error: error.message });
    }

    console.log(hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
      user: data,
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected server error" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Name query parameter is required" });
    }

    const { data, error } = await supabase
      .from("users2")
      .select("id, name, email, age, location")
      .eq("name", name)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      messaage: "User fetched",
      user: data,
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected server error" });
  }
};
