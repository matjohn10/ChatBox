module.exports = function socketMW(httpServer) {
  const { Server } = require("socket.io");
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://216.209.98.135:5173/"],
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
        socket
          .to(member.userId)
          .emit("added-to-chat", {
            friend: { username: data.user },
            room: { name: data.room.name },
          });
      });
    });

    //Socket for messages
    socket.on("message_to_friend", (data) => {
      socket.to(data.to).emit("message_from_friend");
    });
    socket.on("message_to_group", (data) => {
      data.group.members.map((member) => {
        socket.to(member.userId).emit("message_from_friend");
      });
    });
  });
};
