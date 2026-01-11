import { readFile } from "fs/promises";

export async function fileOperations() {
  try {
    const data = await readFile("data.txt", "utf-8");
    return data;
  } catch (error) {
    console.log("Error reading file : ", error.message);
  }
}

fileOperations();
