const express = require("express");
const router = express.Router();
const { User, UserSettings } = require("../assets/usersDb");
const mutateConvo = require("../middleware/userHooks");

router.post("/login", async (req, res) => {
  const user = await User.find(req.body);
  const settings = await UserSettings.findOne({ userId: user[0]?.userId });

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
  const UserSetting = new UserSettings({
    userId: req.body.userId,
    isDarkMode: false,
    bgColor: req.body.bgColor,
  });

  try {
    await user.save();
    await UserSetting.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/add-friend", async (req, res) => {
  const user = await User.findOne({ userId: req.body.user.userId });
  const userAsFriend = await User.findOne(
    { userId: req.body.user.userId },
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

  mutateConvo(to, from, req, null);

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

router.post("/add-group-message", async (req, res) => {
  const from = await User.findOne({ userId: req.body.from });
  const fromConvo = from.conversations.find(
    (convo) => convo.convoId === req.body.group.roomId
  );

  req.body.group.members.map(async (member) => {
    const to = await User.findOne({
      userId: member.userId,
      username: member.username,
    });
    mutateConvo(to, from, req, req.body.group.roomId);
    try {
      to.markModified("conversations");
      await to.save();
    } catch (error) {
      res.status(500).send(error);
    }
  });

  const newConvoArray = from.conversations.filter(
    (obj) => obj.convoId !== fromConvo.convoId
  );

  fromConvo.sent.push({ content: req.body.content, date: req.body.date });
  from.conversations = [...newConvoArray, fromConvo];

  try {
    from.markModified("conversations");
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

router.post("/add-room", async (req, res) => {
  const userAsFriend = await User.findOne(
    { userId: req.body.user.userId, username: req.body.user.username },
    "userId firstname lastname username bgColor"
  );

  // Modify the group's creator rooms array
  const creator = await User.findOne({
    userId: req.body.user.userId,
    username: req.body.user.username,
  });
  creator.rooms = [...creator.rooms, req.body.room];

  //Modify the members rooms array
  req.body.room.members.map(async (member) => {
    const user = await User.findOne({
      userId: member.userId,
      username: member.username,
    });
    // Modify room and convo objects
    mutateConvo(user, creator, req, req.body.room.roomId);
    // creator.markModified("conversations");
    const modifiedRoom = [...req.body.room.members].filter(
      (item) => member.userId !== item.userId
    );
    modifiedRoom.push(userAsFriend);
    const room = {
      name: req.body.room.name,
      roomId: req.body.room.roomId,
      members: modifiedRoom,
    };
    const newMemberRooms = [...user.rooms, room];
    user.rooms = newMemberRooms;

    try {
      user.markModified("conversations");
      user.markModified("rooms");
      await user.save();
    } catch (error) {
      res.status(500).send(error);
    }
  });
  creator.conversations = [
    ...creator.conversations,
    {
      convoId: req.body.room.roomId,
      sent: [{ content: req.body.content, date: req.body.date }],
      received: [],
    },
  ];
  try {
    creator.markModified("rooms");
    creator.markModified("conversations");
    await creator.save();
    res.send(creator);
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
