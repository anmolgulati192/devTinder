const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      loggedInUser[key] = updates[key];
    });
    await loggedInUser.save();
    res.json({ message: "Profile updated successfully", data: loggedInUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/passwordChange", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    const isPasswordMatch = await user.validatePassword(oldPassword);
    if (!isPasswordMatch) {
      return res.status(400).send("Old password is incorrect");
    }
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .send("New password must be different from the old password");
    }
    user.password = newPassword;
    await user.save();
    res.send("Password changed successfully");
  } catch (err) {
    res.status(400).send("Server error");
  }
});

module.exports = profileRouter;
