require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const { User } = require("../../models/user.model");

const { checkAndValidateErrors: handleError } = require("../../errors/catch");

const log = require("../../logger/logger");

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await User.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    res.status(200).json({ success: "User signup successful" });
    console.log(log.handler("User Signup Successful\n"));
  } catch (error) {
    handleError(error, res, "Unable to signup!");
  }
};

const signin = async (req, res) => {
  try {
    const { user } = req.body;
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.setHeader("Authorization", token);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    res.status(200).json({ success: "User is now signed in" });
    console.log(log.handler("User is now signed in\n"));
  } catch (error) {
    handleError(error, res, "Unable to signin!");
  }
};

module.exports = { signup, signin };
