class AuthenticationError extends Error {
  constructor(message = "Failed to validate User", statusCode = 403) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AuthenticationError";
  }
}

class InvalidPayloadSchema extends Error {
  constructor(message = "Invalid request body sent", statusCode = 409) {
    super(message);
    this.statusCode = statusCode;
    this.name = "InvalidPayloadSchema";
  }
}

class UserNotFoundError extends Error {
  constructor(message = "User not found") {
    super(message);
    this.statusCode = 404;
    this.name = "UserNotFoundError";
  }
}

module.exports = {
  AuthenticationError,
  InvalidPayloadSchema,
  UserNotFoundError,
};
