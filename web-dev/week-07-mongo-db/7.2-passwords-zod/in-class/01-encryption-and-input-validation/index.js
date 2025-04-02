const express = require("express");
const app = express();

const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const errors = require("./errors");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { z } = require("zod");

const chalk = require("chalk");
const success = chalk.green;
const fail = chalk.red;
const userSucess = chalk.yellowBright;

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

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
    // shit is going to boggle some heads
    const payloadSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(8)
        .max(32)
        .regex(/[A-Z]/, "must contain at least one uppercase letter")
        .regex(/[a-z]/, "must contain at least one lowercase letter")
        .regex(/[0-9]/, "must contain one numerical digit")
        .regex(/[^a-zA-Z0-9]/, "must contain at least one special character"),
      name: z.string().min(2).max(32),
    });

    const { success, data } = payloadSchema.safeParse(req.body);

    if (!success) {
      throw new errors.InvalidCredentialsError(
        "sign up fields did not match expected format"
      );
    }

    const { email, password, name } = req.body;

    // if (!email || !password || !name) {
    //   throw new errors.EmptyCredentialsError(
    //     "user can not send empty fields for signup"
    //   );
    // }

    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    res.status(200).json({
      sucess: "user has been created",
    });

    console.log(userSucess("User creation successful"));
  } catch (error) {
    if (error instanceof errors.InvalidCredentialsError) {
      res.status(error.statusCode).json({ error: error.message });
      console.log(fail("User creation failed\n") + error + "\n");
    } else if (error instanceof errors.EmptyCredentialsError) {
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

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new errors.InvalidCredentialsError("passwords no not match");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.setHeader("Authorization", token);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    res.status(200).json({ success: "user is now signed in" });

    console.log(userSucess("Sign in successful\n"));
  } catch (error) {
    if (error instanceof errors.EmptyCredentialsError) {
      res.status(error.statusCode).json({ error: error.message });
      console.log(fail("User sign in failed, empty credentials sent\n"));
    } else if (error instanceof errors.UserNotFoundError) {
      res.status(error.statusCode).json({ error: error.message });
      console.log(fail("User sign in failed, no matching user found\n"));
    } else if (error instanceof errors.InvalidCredentialsError) {
      res.status(error.statusCode).json({ error: error.message });
      console.log(fail("Failed to verify user\n") + error + "\n");
    } else {
      res.status(500).json({ error: "unable to sign-in user" });
      console.log(fail("User sign in failed\n", error.message, "\n"));
    }
  }
});

// designing an auth middleware for subsequent requests

app.use((req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new errors.AuthorizationNotSentError();
    }

    const decodedInfo = jwt.verify(token, JWT_SECRET);
    const userId = decodedInfo.userId;

    req.body.userId = userId;
    next();
  } catch (e) {
    if (e instanceof errors.AuthorizationNotSentError) {
      res.status(e.statusCode).json({ error: e.message });
      console.log(fail("Unable to authenticate user, token not sent\n"));
    } else {
      res.status(403).json({ error: "invalid authorization credentials" });
      console.log(
        fail("Unable to authenticate user, invalid authorization credentials\n")
      );
    }
  }
});

app.post("/todo", async (req, res) => {
  try {
    const { description, status, userId } = req.body;

    if (!userId) {
      throw new errors.InvalidCredentialsError(
        "authorization credentials are invalid"
      );
    }

    if (!description || !status.toString()) {
      throw new errors.EmptyCredentialsError();
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new errors.UserNotFoundError();
    }

    await TodoModel.create({
      description: description,
      status: status,
      userId: userId,
    });

    res.status(200).json({ success: "todo has been created" });
    console.log(success("Todo has been created\n"));
  } catch (e) {
    if (e instanceof errors.InvalidCredentialsError) {
      res.status(e.statusCode).json({ error: e.message });
      console.log(fail("Unable to create todo\n", e.message));
    } else if (e instanceof errors.EmptyCredentialsError) {
      res.status(e.statusCode).json({ error: e.message });
      console.log(fail("Unable to create todo\n", e.message));
    } else if (e instanceof errors.UserNotFoundError) {
      res.status(e.statusCode).json({ error: e.message });
      console.log(fail("Unable to create todo\n", e.message));
    } else {
      res.status(500).json({ error: "failed to create todo" });
      console.log(fail("Unable to create todo\n", e));
    }
  }
});

app.get("/todos", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new errors.InvalidCredentialsError(
        "authorization credentials are invalid"
      );
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new errors.UserNotFoundError();
    }

    const todos = await TodoModel.find({ userId: userId });

    res.status(200).json({ success: todos });
    console.log(success("Fetch todos for user successful\n"));
  } catch (e) {
    if (e instanceof errors.InvalidCredentialsError) {
      res.status(e.statusCode).json({ error: e.message });
      console.log(fail("Unable to fetch todos for user, credentials invalid"));
    } else {
      res.status(500).json({ error: "unable to fetch todos" });
      console.log(fail(`Unable to fetch todos for user\n ${e}`));
    }
  }
});
