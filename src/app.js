const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid credentials");
    } else {
      const token = jwt.sign({ _id: user._id }, "your_jwt_secret", {
        expiresIn: "1d",
      });
      res.cookie("token", token, { expires: new Date(Date.now() + 86400000) });
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send("Server error");
  }
});

app.get("/profile", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  const allowedUpdates = ["photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(data).every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates!");
    }
    if (data?.skills?.length > 5) {
      throw new Error("You can add maximum 5 skills");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Server error" + err.message);
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
