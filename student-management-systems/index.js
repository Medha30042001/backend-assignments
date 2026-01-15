import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;
const DB_FILE = "./db.json";

app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    const parsedData = JSON.parse(data);

    res.status(200).json({ Students: parsedData.students });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student details" });
  }
});

app.post("/students", async (req, res) => {
  try {
    let rawData = await fs.readFile(DB_FILE, "utf-8");
    let parsedData = JSON.parse(rawData);
    let students = parsedData.students;
    let newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;

    let newStudent = {
      id: newId,
      name: req.body.name,
      course: req.body.course,
      year: req.body.year,
    };

    students.push(newStudent);

    await fs.writeFile(DB_FILE, JSON.stringify(parsedData, null, 2));
    res.status(201).json({
      message: "Student Added Successfully",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const idToUpdate = Number(req.params.id);
    const { name, course, year } = req.body;

    const rawData = await fs.readFile(DB_FILE, "utf-8");
    const parsedData = JSON.parse(rawData);
    const students = parsedData.students;

    const studentIndex = students.findIndex((stu) => stu.id === idToUpdate);

    if (studentIndex === -1) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    students[studentIndex] = {
      ...students[studentIndex],
      ...(name && { name }),
      ...(course && { course }),
      ...(year && { year }),
    };

    await fs.writeFile(DB_FILE, JSON.stringify(parsedData, null, 2));

    res.status(200).json({
      message: "Student Updated Successfully",
      student: students[studentIndex],
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update student",
    });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const idToBeDeleted = Number(req.params.id);

    const rawData = await fs.readFile(DB_FILE, "utf-8");
    const parsedData = JSON.parse(rawData);
    const students = parsedData.students;

    const filStudents = students.filter((stu) => stu.id != idToBeDeleted);

    if (filStudents.length === students.length) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    parsedData.students = filStudents;

    await fs.writeFile(DB_FILE, JSON.stringify(parsedData, null, 2));
    res.status(200).json({
      message: "Student Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Student not deleted" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
