import { readFile, appendFile, unlink } from "fs/promises";

async function fileOperations() {
  try {
    const data = await readFile("data.txt", "utf-8");
    console.log("Content of data.txt : ", data);

    await appendFile('data.txt', '\nThis is the second line');
    console.log('Text appended to data.txt');

    await unlink('Readme.md');
    console.log('Readme.md deleted successfully');
  } catch (error) {
    console.log("Error : ", error.message);
  }
}

fileOperations();