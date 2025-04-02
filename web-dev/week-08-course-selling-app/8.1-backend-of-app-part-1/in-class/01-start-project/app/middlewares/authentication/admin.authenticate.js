const jwt = require("jsonwebtoken");
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

const errors = require("../../errors/throw");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");

const { Admin } = require("../../models/admin.model");

const log = require("../../logger/logger");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new errors.AuthenticationError();
    }

    const decodedInfo = jwt.verify(token, JWT_SECRET_ADMIN);

    const { adminId } = decodedInfo;

    if (!adminId) {
      throw new errors.AuthenticationError(
        "Bad authentication request. Consider sign up again",
        401
      );
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      throw new errors.AdminNotFoundError(
        "Bad authentication request. Consider sign up again",
        401
      );
    }

    req.admin = admin;

    console.log(log.middleware("Admin authentication successful... calling next middleware"));
    next();
  } catch (error) {
    handleError(error, res, "Authenctication failed for admin");
  }
};

module.exports = { authenticate };
