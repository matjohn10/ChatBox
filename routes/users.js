const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, UserSettings } = require("../assets/usersDb");

router.post("/login", async (req, res) => {
  const user = await User.find(req.body);
  const settings = await UserSettings.findOne({ userId: user[0].userId });

  try {
    if (settings === null) {
      const newSet = new UserSettings({
        userId: user[0].userId,
        isDarkMode: false,
        bgColor: user[0].bgColor,
      });
      await newSet.save();
      res.send({ user: user[0], settings: newSet });
    } else {
      res.send({ user: user[0], settings });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  const UserSettings = new UserSettings({
    userId: req.body.userId,
    isDarkMode: false,
    bgColor: req.body.bgColor,
  });

  try {
    await user.save();
    await UserSettings.save();
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

router.post("/update-info", async (req, res) => {
  const reqObj = { ...req.body };
  //Mutates the object to remove empty key-value pairs
  Object.keys(reqObj).forEach((key) => !reqObj[key] && delete reqObj[key]);
  delete reqObj.userId;
  const user = await User.findOneAndUpdate(
    { userId: req.body.userId },
    reqObj,
    {
      new: true,
    }
  );

  try {
    if (user === null) throw "No matching user";
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update-settings", async (req, res) => {
  const settings = await UserSettings.findOneAndReplace(
    { userId: req.body.userId },
    req.body,
    { returnDocument: "after" }
  );

  try {
    if (settings === null) throw "No matching user settings";
    res.send(settings);
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
