const bcrypt = require("bcrypt");
const log = require("../../logger/logger");

const errors = require("../../errors/throw");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");

const encrypt = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    req.body.password = hashedPassword;

    console.log(
      log.middleware(
        "Password encryption successful... calling next middleware"
      )
    );
    next();
  } catch (error) {
    res.status(500).json({ error: "Unable to signup user" });
    console.log(log.fail("Failed to encrypt user password") + error + "\n");
  }
};

const verify = async (req, res, next) => {
  try {
    const { password, user } = req.body;

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new errors.AuthenticationError(
        "Either username or password is invalid"
      );
    }

    console.log(
      log.middleware("User validated from database... calling next middleware")
    );
    next();
  } catch (error) {
    handleError(error, res, "Failed to verify user");
  }
};

module.exports = { encrypt, verify };
