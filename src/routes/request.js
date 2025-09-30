const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestsRouter.post("/request/send/:status/:toUserId",userAuth, async (req, res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatuses = ["ignored", "interested"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    if (fromUserId.toString() === toUserId) {
      return res.status(400).json({ error: "Cannot send request to yourself" });
    }

   const toUserIdExists = await User.findById(toUserId);
    if (!toUserIdExists) {
      return res.status(404).json({ error: "Recipient user not found" });
    }

    const existingRequest = await ConnectionRequest.findOne({ 
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
     });
    if (existingRequest) {
      return res.status(400).json({ error: "Connection request already sent" });
    }

     const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data= await connectionRequest.save();
    res.json({
      message: `Connection request ${status} successfully`,
      data
    })
  }
  catch(err){
    return res.status(400).json({ error: err.message });
  }
});

module.exports = requestsRouter;