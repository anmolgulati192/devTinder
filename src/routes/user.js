const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");
    res.json({
      message: "Connection requests retrieved successfully",
      data: connectionRequests,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
module.exports = userRouter;
