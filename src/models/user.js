const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value.toLowerCase())) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: "This is a default about section.",
  },
  skills: {
    type: [String],
  },
},
{ timestamps: true }
  );

module.exports = mongoose.model("User", userSchema);
