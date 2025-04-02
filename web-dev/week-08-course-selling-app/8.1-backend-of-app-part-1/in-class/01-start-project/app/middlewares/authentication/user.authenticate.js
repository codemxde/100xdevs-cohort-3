const jwt = require("jsonwebtoken");
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;

const { User } = require("../../models/user.model");

const errors = require("../../errors/throw");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");

const log = require("../../logger/logger");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new errors.AuthenticationError("Token not sent along the request headers!", 401);
    }

    const decodedInfo = jwt.verify(token, JWT_SECRET_USER);

    const { userId } = decodedInfo;

    if (!userId) {
      throw new errors.AuthenticationError("Malformed token, consider signing again", 401);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new errors.UserNotFoundError();
    }

    req.user = user;

    console.log(log.middleware("User authentication successful... calling next middleware"));

    next();
  } catch (error) {
    handleError(error, res, "Authentication failed for User");
  }
};

module.exports = { authenticate };
