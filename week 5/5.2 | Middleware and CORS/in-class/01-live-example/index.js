const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
// app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/next-page", function (req, res) {
  res.sendFile(__dirname + "/public/page.html");
});

app.post("/sum", function (req, res) {
  const a = req.body.a;
  const b = req.body.b;
  res.status(200).json({
    sum: parseInt(a) + parseInt(b),
  });
});

app.listen(3000);
