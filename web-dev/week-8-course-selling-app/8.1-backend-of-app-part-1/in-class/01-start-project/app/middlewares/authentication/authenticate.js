const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const errors = require("../../errors/throw");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");

const log = require("../../logger/logger");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      errors.AuthenticationError("Token not sent along the request headers!");
    }

    const decodedInfo = jwt.verify(token, JWT_SECRET);
    req.body.decodedInfo = decodedInfo;

    console.log(
      log.middleware("Authentication success... calling next middleware")
    );
    next();
  } catch (error) {
    handleError(error, res, "Authentication failed!");
  }
};

module.exports = { authenticate };
