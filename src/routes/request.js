const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest",userAuth, async (req, res) => {
    const user = req.user;
  // Logic to send a connection request
  res.send(user.firstName+ "sent Connection request");
});

module.exports = requestsRouter;