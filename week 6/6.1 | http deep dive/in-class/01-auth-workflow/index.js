const express = require("express");
const app = express();
// const cors = require("cors");
const users = [];

function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";
  for (let i = 0; i < 32; i++) {
    // use a simple function here
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

// app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", function (req, res) {
  const { username, password } = req.body;

  // * 1. Add check for valid userame and password
  // * 2. Check whether user already exists

  users.push({
    username,
    password,
  });
  res.status(200).send("You have successfully signed up");
});

app.post("/signin", function (req, res) {
  const { username, password } = req.body;
  const user = users.find(function (user) {
    return user.username === username && user.password === password;
  });

  if (!user) {
    res.status(403).json({
      error: "You need to sign up first",
    });
  } else {
    const token = generateToken();
    user.token = token;
    console.log(users);
    res.status(200).json({
      token,
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const user = users.find((user) => user.token === token);
  if (user) {
    res.status(200).json({ user: user.username });
  } else {
    res.status(403).json({
      error: "user is not authorized",
    });
  }
});

app.listen(3000);
