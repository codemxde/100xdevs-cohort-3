const express = require("express");
app = express();

let requests = 0;

app.get("/request-count", function (req, res) {
  res.status(200).json({ requests });
});

app.use(function countRequests(req, res, next) {
  requests++;
  next();
});

app.get("/user", function (req, res) {
  res.status(200).json({
    fname: "john",
  });
});

app.post("/user", function (req, res) {
  res.status(200).json({
    msg: "create dummy user",
  });
});

app.listen("3000");
