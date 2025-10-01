const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please log in first");
    }
    const decodedObject = jwt.verify(token, "your_jwt_secret");

    const { _id } = decodedObject;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { userAuth };
