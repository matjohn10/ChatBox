const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../assets/usersDb");

router.post("/login", async (req, res) => {
  const user = await User.find(req.body);

  try {
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  const users = await User.find(
    {},
    "firstname lastname username email userId bgColor"
  );
  res.send(users);
});

module.exports = router;
