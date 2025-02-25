const express = require("express");

app = express();

app.get("/", function (req, res) {
  res.send("<strong>Hello from Express!</strong>");
});

app.listen("3000");
