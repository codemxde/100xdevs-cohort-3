const express = require("express");
app = express();

let errorCount = 0;

app.get("/user", function (req, res) {
  throw new Error("Uh Oh! There was an error...");
});

app.post("/user", function (req, res) {
  res.status(200).send("Created dummy user");
});

app.use(function (err, req, res, next) {
  res.status(404).json({
    error: err.message,
  });
});

app.listen(3000);
