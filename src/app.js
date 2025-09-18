const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // signup logic
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error signing up user");
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Server error");
  }
});

// get all users for feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Server error");
  }
});

// delete user by _id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    console.log(userId);
    const user = await User.findByIdAndDelete(userId);
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Server error");
  }
});

// update data of user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Server error");
  }
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
