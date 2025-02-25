const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "codemxde4life";

const users = [];

app.use(express.json());

const doesUserExists = (username) => {
  const user = users.find((user) => user.username === username);
  return user;
};

const checkUsernamePassword = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // * check if user already exits inside in-memory variable
  const user = doesUserExists(username);
  if (!user) {
    users.push({
      username,
      password,
    });
    res.status(200).json({
      msg: "Successfuly created user",
    });
  } else {
    res.status(409).json({
      conflict: "user already exists!",
    });
  }
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = checkUsernamePassword(username, password);
  if (!user) {
    res.status(404).json({
      error: "user not found!",
    });
  } else {
    // * generate and send jwt
    const token = jwt.sign({ username }, JWT_SECRET);
    res.status(200).send({ token });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const decodedInfo = jwt.verify(token, JWT_SECRET);
  const username = decodedInfo.username;
  const password = users.find((user) => user.username === username).password;
  res.json({ username, password });
});

app.listen(3000);
