class UserNotFoundError extends Error {
  constructor(message = "User does not exits") {
    super(message);
    this.statusCode = 404;
    this.name = "UserNotFoundError";
  }
}

class UserAlreadyExists extends Error {
  constructor(message = "User already exists") {
    super(message);
    this.statusCode = 409;
    this.name = "UserAlreadyExists";
  }
}

class IncompleteRequestError extends Error {
  constructor(message = "Incomplete request body sent") {
    super(message);
    this.statusCode = 409;
    this.name = "IncompleteRequestError";
  }
}

class InvalidPayloadSchema extends Error {
  constructor(message = "Invalid payload sent along request") {
    super(message);
    this.statusCode = 409;
    this.name = "InvalidPayloadSchema";
  }
}

module.exports = {
  UserNotFoundError,
  UserAlreadyExists,
  IncompleteRequestError,
  InvalidPayloadSchema,
};
