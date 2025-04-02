const { Router } = require("express");
const router = Router();

const { validate, checkName } = require("../middlewares/input-validation/common.validate");

const { checkExisting } = require("../middlewares/input-validation/user.validate");

const { encrypt, verify } = require("../middlewares/encryption/user.encryption");

const { signup, signin } = require("../controllers/user.controller");

router.post("/signup", validate, checkName, encrypt, signup);

router.post("/signin", validate, checkExisting, verify, signin);

// router.post("/purchase", async (params) => {});

module.exports = { router };
