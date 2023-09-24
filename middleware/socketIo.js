const { User } = require("../assets/usersDb");
require("dotenv").config();

module.exports = function socketMW(httpServer) {
  const { Server } = require("socket.io");
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://216.209.98.135:5173/",
        process.env.PROD_URL,
      ],
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("message", (data) => {
      if (data.room) socket.to(data.room).emit("receive", data);
      else socket.broadcast.emit("receive", data);
    });

    //Room joined

    socket.on("room", (data) => {
      socket.join(data.room);
    });

    //Typing effect
    socket.on("isTyping", (data) => {
      if (data.room) socket.to(data.room).emit("isTyping", data);
      else socket.broadcast.emit("isTyping", data);
    });

    // REAL APP LISTEN

    //Added to room/friend
    socket.on("add_personal_room", (data) => {
      if (data.room) socket.join(data.room);
    });
    socket.on("friend_added", ({ user, friend }) => {
      socket.to(friend.userId).emit("friend_added", { user: friend });
    });
    socket.on("room-created", (data) => {
      data.room.members.map((member) => {
        socket.to(member.userId).emit("added-to-chat", {
          friend: { username: data.user },
          room: { name: data.room.name },
        });
      });
    });

    //Socket for messages
    socket.on("message_to_friend", async (data) => {
      const toUser = await User.findOne({
        userId: data.to,
      });
      console.log(toUser.conversations[1]);
      socket.to(data.to).emit("message_from_friend", { user: toUser });
    });
    socket.on("message_to_group", async (data) => {
      data.group.members.map(async (member) => {
        const toUser = await User.findOne({
          userId: member.userId,
          username: member.username,
        });
        socket.to(member.userId).emit("message_from_friend", { user: toUser });
      });
    });
  });
};
