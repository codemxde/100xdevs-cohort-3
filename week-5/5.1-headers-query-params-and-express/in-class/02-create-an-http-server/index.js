const express = require("express");
const app = express();

let a,
  b = 0;

app.use(function (req, res, next) {
  a = Number(req.query.a);
  b = Number(req.query.b);
  next();
});

app.get("/multiply", function (req, res) {
  const result = (a * b).toString();
  res.send(result);
});

app.get("/add", function (req, res) {
  const result = (a + b).toString();
  res.send(result);
});

app.get("/divide", function (req, res) {
  const result = (a / b).toString();
  res.send(result);
});

app.get("/subtract", function (req, res) {
  const result = (a - b).toString();
  res.send(result);
});

app.listen(3000);
