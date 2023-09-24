const express = require("express");
const router = express.Router();
const { UserSocket } = require("../assets/usersDb");

router.post("/save-id", async (req, res) => {
  let userSocket = await UserSocket.findOne({ userId: req.body.userId });

  try {
    if (userSocket === null) {
      userSocket = new UserSocket(req.body);
      await userSocket.save();
      res.send(userSocket);
    } else {
      await UserSocket.replaceOne(userSocket, req.body);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
