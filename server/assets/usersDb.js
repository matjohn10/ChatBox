const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
  conversations: {
    type: Array,
    required: true,
  },
  rooms: {
    type: Array,
    required: true,
  },
});

const UserSocketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
});

const UserSettingsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  isDarkMode: {
    type: Boolean,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const UserSocket = mongoose.model("UserSocket", UserSocketSchema);
const UserSettings = mongoose.model("UserSettings", UserSettingsSchema);
module.exports = {
  User: User,
  UserSocket: UserSocket,
  UserSettings: UserSettings,
};
