const errors = require("./throw");
const log = require("../logger/logger");

const sendErrorResponse = (error, res) => {
  res.status(error.statusCode).json({ error: error.message });
  console.log(log.fail(error) + "\n");
  // console.log(log.fail(error) + "\n" + error.stack + "\n\n");
};

const checkAndValidateErrors = (error, res, custom) => {
  if (error instanceof errors.InvalidPayloadSchema) {
    sendErrorResponse(error, res);
  } else if (error instanceof errors.AuthenticationError) {
    sendErrorResponse(error, res);
  } else if (error instanceof errors.UserNotFoundError) {
    sendErrorResponse(error, res);
  } else {
    res.status(500).json({ error: custom });
    console.log(log.fail(custom) + "\n" + error.message + "\n");
  }
};

module.exports = { checkAndValidateErrors };
