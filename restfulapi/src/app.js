const express = require("express");
require("./db/conn");
const Student = require("./db/models/students");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// get the data of registered Students
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.status(201).send(studentData);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get the indivisual Students data using ID
app.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById({ _id});
    if (!studentData) {
      return res.status(404).send("Not valid Id");
    } else {
      res.status(201).send(studentData);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// create a new students
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send(e);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
