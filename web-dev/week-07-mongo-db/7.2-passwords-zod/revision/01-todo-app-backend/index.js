// * This file contains the meat of the logic
const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const bcrypt = require("bcrypt");

const { UserModel, TodoModel } = require("./database");
const mongoose = require("mongoose");

const { z } = require("zod");

const chalk = require("chalk");
const success = chalk.green.bold;
const fail = chalk.redBright.bold;

const errors = require("./errors");

(async function connectMongoDb(params) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(success("Connection with Database Established"));
    app.listen(PORT, () => {
      console.log(
        success("Application Startup Complete, Serving on Port ") +
          chalk.blue.bold(PORT) +
          "\n"
      );
    });
  } catch (e) {
    console.log(
      fail("Database Server Connection Failed... Exiting Application\n")
    );
    process.exit(1);
  }
})();

const sendErrorResponse = (error, res) => {
  res.status(error.statusCode).json({ error: error.message });
  console.log(fail(error.message) + "\n" + error + "\n");
};

const checkAndSendErrorResponse = (error, res, customError) => {
  if (error instanceof errors.InvalidPayloadSchema) {
    sendErrorResponse(error, res);
  } else if (error instanceof errors.IncompleteRequestError) {
    sendErrorResponse(error, res);
  } else if (error instanceof errors.UserNotFoundError) {
    sendErrorResponse(error, res);
  } else if (error instanceof errors.UserAlreadyExists) {
    sendErrorResponse(error, res);
  } else {
    res.status(500).json({ error: customError });
    console.log(fail(customError) + "\n" + error);
  }
};

app.use(express.json());

app.use(async (req, res, next) => {
  const payloadSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(32)
      .regex(/[0-9]/, "password must have one digit")
      .regex(/[a-z]/, "password must have a lowercase alphabet")
      .regex(/[^a-zA-Z0-9]/, "password must have a special character"),
  });

  const parseResult = payloadSchema.safeParse(req.body);

  console.log(
    success("Payload schema validation successful, calling next middleware\n")
  );
  next();
  if (parseResult.success) {
  } else {
    res.status(409).json({ error: "invalid credential formatting" });
    console.log(fail("Failed to validate payload schema\n"));
  }
});

app.post("/signup", async (req, res) => {
  try {
    // 1. Input Name Validation
    const name = req.body.name;
    if (name) {
      const nameSchema = z.string().min(2).max(32);
      const parseResult = nameSchema.safeParse(name);

      if (!parseResult.success) {
        res.status(409).json({ error: "name field validation failed" });
        throw new errors.InvalidPayloadSchema();
      }
    } else {
      throw new errors.IncompleteRequestError();
    }

    const { email, password } = req.body;

    // 2. User Pre-Exists Validation
    const user = await UserModel.findOne({ email: email });

    if (user) {
      throw new errors.UserAlreadyExists();
    }

    // 3. Encrypting User Password
    const hashedPassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    console.log(chalk.yellow.bold("User has been added to the Database\n"));
    res.status(200).json({ success: "user sign up successful" });
  } catch (error) {
    checkAndSendErrorResponse(error, res, "unable to create user");
  }
});
