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

router.post("/add-friend", async (req, res) => {
  const user = await User.findOne(req.body.user);
  const userAsFriend = await User.findOne(
    req.body.user,
    "userId firstname lastname username bgColor"
  );
  const friend = await User.findOne(req.body.friend);

  try {
    if (!friend.friends.includes(userAsFriend))
      friend.friends.push(userAsFriend);

    user.friends = req.body.friends;
    await friend.save();
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/add-message", async (req, res) => {
  const to = await User.findOne({ userId: req.body.to });
  const from = await User.findOne({ userId: req.body.from });

  const toConvo = to?.conversations.find(
    (convo) => convo.convoId === from.userId
  );
  const fromConvo = from?.conversations.find(
    (convo) => convo.convoId === to.userId
  );

  if (toConvo) {
    const newConvoArray = to.conversations.filter(
      (obj) => obj.convoId !== toConvo.convoId
    );
    toConvo.received.push({
      userId: from.userId,
      content: req.body.content,
      date: req.body.date,
    });
    to.conversations = [...newConvoArray, toConvo];
  } else {
    to.conversations.push({
      convoId: from.userId,
      sent: [],
      received: [
        {
          userId: from.userId,
          content: req.body.content,
          date: req.body.date,
        },
      ],
    });
  }
  if (fromConvo) {
    const newConvoArray = from.conversations.filter(
      (obj) => obj.convoId !== fromConvo.convoId
    );
    fromConvo.sent.push({ content: req.body.content, date: req.body.date });
    from.conversations = [...newConvoArray, fromConvo];
  } else {
    from.conversations.push({
      convoId: to.userId,
      sent: [{ content: req.body.content, date: req.body.date }],
      received: [],
    });
  }
  try {
    to.markModified("conversations");
    from.markModified("conversations");
    await to.save();
    await from.save();

    res.send(from);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  const users = await User.find(
    {},
    "firstname lastname username userId bgColor"
  );
  res.send(users);
});

module.exports = router;
