const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

// get the data of registered Students Details
router.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.status(201).send(studentData);
  } catch (e) {
    res.status(400).send(e);
  }
});

// get the indivisual Students data using ID
router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById({ _id });
    if (!studentData) {
      return res.status(404).send("Not valid Id");
    } else {
      res.status(201).send(studentData);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// create a new Students
router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send(e);
  }
});

// update the indivisual Students data using ID
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updateStudent) {
      return res.status(404).send("Not valid Id");
    } else {
      res.status(201).send(updateStudent);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// delete the indivisual Students data using ID
router.delete("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete({ _id });
    if (!deleteStudent) {
      return res.status(404).send("Not valid Id");
    } else {
      res.status(201).send(deleteStudent);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
