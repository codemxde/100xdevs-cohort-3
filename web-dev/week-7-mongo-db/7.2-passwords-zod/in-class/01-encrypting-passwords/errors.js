// This JS file is just a compilation of all the expected errors

class EmptyCredentialsError extends Error {
  constructor(message = "Empty credentials") {
    super(message);
    this.name = "EmptyCredentialsError";
    this.statusCode = 403;
  }
}

class InvalidCredentialsError extends Error {
  constructor(message = "Invalid credentials") {
    super(message);
    this.name = "InvalidCredentialsError";
    this.statusCode = 401;
  }
}

class UserNotFoundError extends Error {
  constructor(message = "User not found") {
    super(message);
    this.statusCode = 404;
  }
}

class AuthorizationNotSentError extends Error {
  constructor(message = "Authentication token not sent along the request") {
    super(message);
    this.name = "AuthorizationNotSentError";
    this.statusCode = 404;
  }
}

module.exports = {
  UserNotFoundError,
  InvalidCredentialsError,
  EmptyCredentialsError,
  AuthorizationNotSentError,
};
