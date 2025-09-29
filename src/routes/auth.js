const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    // encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }
    const isPasswordMatch = await user.validatePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, { expires: new Date(Date.now() + 86400000) });
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("Server error");
  }
});

module.exports = authRouter;