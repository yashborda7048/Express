const express = require("express");
require("./db/conn");
const Student = require("./db/models/students");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// // First Method
// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body)
//   user.save().then(() => {
//       res.status(201).send(user);
//   }).catch((e) => {
//     res.status(400).send(e);
//   })
// });

// // async and awit use
app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
