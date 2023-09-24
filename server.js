const express = require("express");
require("dotenv").config();
const PORT = 3000;
const app = express();
const http = require("http");
const server = http.createServer(app);
require("./middleware/socketIo")(server);
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ldv4coe.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const usersDb = mongoose.connection;
usersDb.on("error", console.error.bind(console, "connection error: "));
usersDb.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json());
app.use(
  cors({
    origin:
      process.env.ENVIRONMENT === "production"
        ? process.env.PROD_URL
        : "http://localhost:5173",
  })
);
app.use("/users", require("./routes/users"));
app.use("/socket", require("./routes/socket"));

server.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
