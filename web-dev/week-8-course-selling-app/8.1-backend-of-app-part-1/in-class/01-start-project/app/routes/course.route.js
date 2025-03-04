const { Router } = require("express");
const router = Router();

const { authenticate } = require("../middlewares/authentication/user.authenticate");

const {
  validatePurchase,
  courseExists,
} = require("../middlewares/input-validation/course.validate");

const {
  fetchCourses,
  checkPreviousPurchase,
} = require("../middlewares/database/purchases.database");

const { purchase, preview } = require("../controllers/user.controller");

router.use(authenticate);

router.post("/purchase", validatePurchase, courseExists, checkPreviousPurchase, purchase);

router.get("/preview", fetchCourses, preview);

module.exports = { router };
