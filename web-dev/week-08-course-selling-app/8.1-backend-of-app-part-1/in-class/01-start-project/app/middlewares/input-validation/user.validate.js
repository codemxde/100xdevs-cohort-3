const errors = require("../../errors/throw");
const log = require("../../logger/logger");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");
const { User } = require("../../models/user.model");

const checkExisting = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new errors.UserNotFoundError();
    }

    req.body.user = user;

    console.log(log.middleware("User found in database... calling next middleware"));
    next();
  } catch (error) {
    handleError(error, res, "Unable to check user existence");
  }
};

module.exports = { checkExisting };
