const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "codemxde";

const users = [];

const checkIfUserExists = (username) => {
  return users.find((user) => user.username === username);
};

const checkCredentials = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};

const generateJWT = (username) => {
  return jwt.sign({ username }, JWT_SECRET);
};

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const user = checkIfUserExists(username);

  if (user) {
    res.status(409).json({ msg: "user already exists!" });
  } else {
    users.push({ username, password });
    res.json({ msg: "user created successfuly" });
  }
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = checkCredentials(username, password);
  if (user) {
    // * generate and send jwt
    const token = generateJWT(username);
    res.json({ token });
  } else {
    // * 404 user not found
    res.status(404).json({ err: "user not found" });
  }
});

const auth = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.status(409).json({ conflict: "you need to sign in first!" });
  } else {
    try {
      const decodedInfo = jwt.verify(token, JWT_SECRET);
      req.username = decodedInfo.username;
      next();
    } catch {
      res.status(401).json({ error: "user is not authorized" });
    }
  }
};

app.use(auth);

app.get("/me", auth, (req, res) => {
  //   const token = req.headers.authorization;
  //   const decodedInfo = jwt.verify(token, JWT_SECRET);
  const username = req.username;
  res.json({ username });
});

app.listen(3000);
