const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

const { Admin } = require("../models/admin.model");
const { Course } = require("../models/course.model");

const errors = require("../errors/throw");
const { checkAndValidateErrors: handleError } = require("../errors/catch");

const log = require("../logger/logger");

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    await Admin.create({ email, password, firstName, lastName });

    res.status(200).json({ success: "Admin has been credted" });
    console.log(log.handler("Admin has been created!"));
  } catch (error) {
    handleError(error, res, "Unable to create admin");
  }
};

const signin = async (req, res) => {
  try {
    const { admin } = req.body;
    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET_ADMIN);

    res.setHeader("Authorization", token);
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    res.status(200).json({ success: "Admin is now signed in" });
    console.log(log.handler("Admin is now signed in\n"));
  } catch (error) {
    handleError(error, res, "Unable to signin!");
  }
};

const add = async (req, res) => {
  try {
    const { creatorId } = req;
    const { title, description, price, imageUrl } = req.body;

    await Course.create({ title, description, price, imageUrl, creatorId });

    console.log(log.handler("Course by admin added successfully\n"));

    res.status(200).json({ success: "Course by admin added successfully" });
  } catch (error) {
    handleError(error, res, "Failed to add course by admin");
  }
};

const get = async (req, res) => {
  try {
    const { admin } = req;
    const courses = await Course.find({ creatorId: admin.id });

    res.json({ success: courses });
    console.log(log.handler("Fetched all the courses by the creator\n"));
  } catch (error) {
    handleError(error, res, "Failed to fetch courses by creator");
  }
};

const update = async (req, res) => {
  try {
    const { courseId, ...update } = req.body;
    const result = await Course.findOneAndUpdate(
      {
        creatorId: req.admin.id,
        _id: courseId,
      },
      update
    );

    if (!result) {
      throw new errors.CourseNotFoundError();
    }

    res.status(200).json({ success: "Course details have been updated" });
    console.log(log.handler("Course details have been updated for admin\n"));
  } catch (error) {
    handleError(error, res, "Failed to update course details");
  }
};

module.exports = { signup, signin, add, get, update };
