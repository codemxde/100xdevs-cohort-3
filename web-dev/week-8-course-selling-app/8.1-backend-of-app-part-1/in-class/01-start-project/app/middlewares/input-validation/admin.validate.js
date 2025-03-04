const errors = require("../../errors/throw");
const log = require("../../logger/logger");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");
const { Admin } = require("../../models/admin.model");

const checkExisting = async (req, res, next) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      throw new errors.AdminNotFoundError();
    }

    req.body.admin = admin;

    console.log(log.middleware("Admin found in database... calling next middleware"));
    next();
  } catch (error) {
    handleError(error, res, "Unable to check admin existence");
  }
};

module.exports = { checkExisting };
