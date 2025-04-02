const express = require("express");
const app = express();

require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const { UserModel, TodoModel } = require("./db");

app.use(express.json());

app.post("/signup", async function (req, res) {
  const { email, password, name } = req.body;
  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({ message: "You are signed up!" });
});

app.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.setHeader("Authentication", token);

    //  allowing client to access this header for client
    res.setHeader("Access-Control-Expose-Headers", "Authentication");
    res.status(200).json({ message: "Sign up successful" });
  } else {
    res.status(404).json({
      error: "user not found",
    });
  }
});

app.use(async function (req, res, next) {
  const token = req.headers.authentication;
  if (token) {
    try {
      const decodedInfo = jwt.verify(token, JWT_SECRET);

      // modify request body and call next middleware
      req.body.userId = decodedInfo.id;
      next();
    } catch (error) {
      res.status(403).json({ error: "unable to authenticate user" });
    }
  }
});

app.post("/todo", async function (req, res) {
  const { userId, title, done } = req.body;

  await TodoModel.create({
    userId: userId,
    title: title,
    done: done,
  });

  res.json({
    message: "todo has been added",
  });
});

app.get("/todos", async function (req, res) {
  const { userId } = req.body;
  const tasks = await TodoModel.find({
    userId: userId,
  });
  console.log("Tasks:", tasks);
  res.json({ message: "logged tasks to server console" });
});

app.listen(3000);
