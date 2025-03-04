const jwt = require("jsonwebtoken");
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;

const { User } = require("../models/user.model");
const { Purchase } = require("../models/purchase.model");
const { Course } = require("../models/course.model");

const { checkAndValidateErrors: handleError } = require("../errors/catch");

const log = require("../logger/logger");

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
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_USER);

    res.setHeader("Authorization", token);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    res.status(200).json({ success: "User is now signed in" });
    console.log(log.handler("User is now signed in\n"));
  } catch (error) {
    handleError(error, res, "Unable to signin!");
  }
};

const purchase = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    await Purchase.create({ courseId, userId });

    res.status(200).json({ message: "Congratulations! You have purchased the course" });
    console.log(log.handler("Course purchase successful"));
  } catch (error) {
    handleError(error, res, "Failed to purchase course");
  }
};

const preview = async (req, res) => {
  try {
    const { purchases } = req;

    const courses = await Course.find({
      _id: { $in: purchases.map((purchase) => purchase.courseId) },
    });

    res.status(200).json({ courses });
  } catch (error) {
    handleError(error, res, "Unable to fetch courses bought by user");
  }
};

module.exports = { signup, signin, purchase, preview };
