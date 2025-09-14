const express = require('express');
const connectDB= require('./config/database');
const app = express();
const User = require('./models/user');

app.post("/signup", async (req, res) => {
    // creating new instance of user model
    const user = new User({
        firstName: "John",
        lastName: "Doe",
        emailId: "xyz@google.com",
        password: "123456",
    });
    try{
    await user.save();
    res.send("User signed up successfully");
    } catch(err) {
        res.status(400).send("Error signing up user");
    }
});

connectDB().then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log("DB connection failed", err);
});
