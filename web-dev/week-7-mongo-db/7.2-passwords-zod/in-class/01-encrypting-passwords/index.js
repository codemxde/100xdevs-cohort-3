const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const errors = require("./errors");

const chalk = require("chalk");
const success = chalk.green;
const fail = chalk.red;
const userSucess = chalk.yellowBright;

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

(async function startDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(success("Mongo DB Conection Established"));
    app.listen(PORT, () => {
      console.log(
        success(`Application Server Running On Port `) +
          chalk.blue.bold(PORT) +
          "\n"
      );
    });
  } catch (error) {
    console.log(fail("Connection With Mongo Server Failed To Establish"));
    process.exit(1);
  }
})();

app.use(express.json());

app.post("/signup", async function (req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new errors.EmptyCredentialsError(
        "user can not send empty fields for signup"
      );
    }

    await UserModel.create({
      email: email,
      password,
      name: name,
    });

    res.status(200).json({
      sucess: "user has been created",
    });

    console.log(userSucess("User creation successful"));
  } catch (error) {
    if (error instanceof errors.EmptyCredentialsError) {
      res.status(error.statusCode).json({ error: error.message });
      console.log(fail("User creation failed, empty credentials sent\n"));
    } else {
      res.status(409).json({ error: "error creating user" });
      console.log(fail("User creation failed\n", error, "\n"));
    }
  }
});

app.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      throw new errors.EmptyCredentialsError();
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new errors.UserNotFoundError();
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.setHeader("Authentication", token);
    res.setHeader("Access-Control-Expose-Headers", "Authentication");

    res.status(200).json({ success: "user is now signed in" });

    console.log(userSucess("Sign in successful\n"));
  } catch (error) {
    if (error instanceof errors.EmptyCredentialsError) {
      res.status(error.statusCode).json({ error: error.message });
      console.log(fail("User sign in failed, empty credentials sent\n"));
    } else if (error instanceof errors.UserNotFoundError) {
      res.status(error.statusCode).json({ error: error.message });
      console.log(fail("User sign in failed, no matching user found\n"));
    } else {
      res.status(500).json({ error: "unable to sign-in user" });
      console.log(fail("User sign in failed\n", error.message, "\n"));
    }
  }
});

// * continue designing the /todo routes tomorrow
