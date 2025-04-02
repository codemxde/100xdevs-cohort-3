const { Router } = require("express");
const router = Router();

const { authenticate } = require("../middlewares/authentication/admin.authenticate");

const { validate, checkName } = require("../middlewares/input-validation/common.validate");

const {
  validateCourse,
  validateUpdate,
} = require("../middlewares/input-validation/course.validate");

const { checkExisting } = require("../middlewares/input-validation/admin.validate");

const { encrypt, verify } = require("../middlewares/encryption/admin.encryption");

const { signup, signin, add, get, update } = require("../controllers/admin.controller");

router.post("/signup", validate, checkName, encrypt, signup);

router.post("/signin", validate, checkExisting, verify, signin);

router.use(authenticate);

router.post("/course", validateCourse, add);

router.put("/course", validateUpdate, update);

router.get("/course/all", get);

module.exports = { router };
