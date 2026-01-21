import fs from "fs/promises";

const DB_FILE = "./db.json";

export const readDB = async () => {
  const raw = await fs.readFile(DB_FILE, "utf-8");
  return JSON.parse(raw);
};

export const writeDB = async (data) => {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
};
