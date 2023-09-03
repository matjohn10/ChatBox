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
    socket.on("add_personal_room", (data) => {
      if (data.room) socket.join(data.room);
      console.log(socket.rooms);
    });
  });
};
