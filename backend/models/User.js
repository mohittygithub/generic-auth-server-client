const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 55,
      lowercase: true,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
      required: [true, "Please provide your email"],
      max: 255,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      min: 6,
      max: 255,
    },
    profile: {
      type: String,
      required: [true, "Please fill up your profile"],
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
