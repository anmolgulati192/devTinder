const express = require('express');
const app = express();

// handle auth middleware for all get, post, put, delete requests
app.use("/admin",
  (req, res, next) => {
    console.log("In the first middleware!");
    const token = 'xyz';
    if (token === 'xyz') {
      next();
    } else {
      res.status(401).send("Not allowed!");
    }
}
)

app.get("/admin/getAllData", (req, res) => {
  res.send("Here is the data from the server!");
})

app.delete("/admin/deleteAllData", (req, res) => {
  res.send("All data deleted!");
})

app.listen(3000)