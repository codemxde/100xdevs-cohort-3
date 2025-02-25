const express = require("express");

app = express();

function ticketChecker(req, res, next) {
  const ticket = req.query.ticket;
  if (ticket === "free") {
    next();
  } else {
    res.status(403).send("Access Denied!");
  }
}

app.use(ticketChecker);

app.get("/ride1", function (req, res) {
  res.send("You rode the first ride!");
});

app.get("/ride2", function (req, res) {
  res.send("You rode the second ride!");
});

app.get("/ride3", function (req, res) {
  res.send("You rode the third ride!");
});

app.listen(3000);
