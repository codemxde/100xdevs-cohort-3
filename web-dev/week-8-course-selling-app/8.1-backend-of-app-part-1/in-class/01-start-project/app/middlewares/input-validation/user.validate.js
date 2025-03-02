const { z } = require("zod");
const errors = require("../../errors/throw");
const log = require("../../logger/logger");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");
const { User } = require("../../models/user.model");

const validate = (req, res, next) => {
  try {
    const credentialSchema = z.object({
      email: z.string().max(32).email(),
      password: z.string().max(32),
    });

    const parseResult = credentialSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new errors.InvalidPayloadSchema();
    }

    console.log(
      log.middleware("Input validation success... calling next middleware")
    );
    next();
  } catch (error) {
    handleError(error, res, "Unable to validate input credentails");
  }
};

const checkName = (req, res, next) => {
  try {
    const namingSchema = z.object({
      firstName: z.string().min(2).max(32),
      lastName: z.string().min(2).max(32),
    });

    const parseResult = namingSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new errors.InvalidPayloadSchema();
    }

    console.log(
      log.middleware("Name validation success... calling next middleware")
    );
    next();
  } catch (error) {
    handleError(error, res, "Unable to validate input credentails");
  }
};

const checkExisting = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new errors.UserNotFoundError();
    }

    req.body.user = user;

    console.log(
      log.middleware("User found in database... calling next middleware")
    );
    next();
  } catch (error) {
    handleError(error, res, "Unable to check user existence");
  }
};

module.exports = { validate, checkName, checkExisting };
