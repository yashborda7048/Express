const express = require("express");
const router = new express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

// create a new register
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const  token = await user.generateAuthToken();
    console.log(token);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    console.log(e, "error");
    res.status(400).send(e);
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await User.findOne({ email });
    const isMatch = bcrypt.compare(password, useremail.password);

    if (isMatch) {
      res.status(201).send(useremail);
    } else {
      res.status(400).send("Invalid password.");
    }
  } catch (e) {
    console.log(e, "error");
    res.status(400).send("Invalid login details.");
  }
});

// // update the indivisual users data using ID
// router.patch("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const updateUser = await User.findByIdAndUpdate(_id, req.body, {
//       new: true,
//     });
//     if (!updateUser) {
//       return res.status(404).send("Not valid Id");
//     } else {
//       res.status(201).send(updateUser);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// // delete the indivisual users data using ID
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const deleteUser = await User.findByIdAndDelete({ _id });
//     if (!deleteUser) {
//       return res.status(404).send("Not valid Id");
//     } else {
//       res.status(201).send(deleteUser);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
