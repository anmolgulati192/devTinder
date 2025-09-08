const express = require('express');
const app = express();

// handle auth middleware for all get, post, put, delete requests
app.use("/admin",
  (req, res, next) => {
    try {
      //logic for db call
      throw new Error("DB connection failed");
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
}
)

app.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Here is the data from the server!");
})

app.delete("/admin/deleteAllData", (req, res) => {
  res.send("All data deleted!");
})

app.listen(3000)