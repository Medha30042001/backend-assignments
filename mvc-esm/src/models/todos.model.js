import fs from "fs/promises";

const DB_PATH = "./src/db.json";

export const readTodos = async () => {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw);
};

export const writeTodos = async (data) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};
