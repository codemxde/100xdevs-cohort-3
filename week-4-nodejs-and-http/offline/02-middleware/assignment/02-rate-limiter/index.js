const express = require("express");
app = express();

const numberOfRequestsForUser = {};

setInterval(function () {
  numberOfRequestsForUser = {};
}, 1000);

app.use(function (req, res, next) {
  const userId = req.header["user-id"];
  console.log(`user-id: ${userId}`);
  if (numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId]++;
    if (numberOfRequestsForUser[userId] > 5) {
      res.status(404).send("No entry!");
    } else {
      next();
    }
  } else {
    numberOfRequestsForUser[userId] = 1;
    next();
  }
});

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.listen("3000");
