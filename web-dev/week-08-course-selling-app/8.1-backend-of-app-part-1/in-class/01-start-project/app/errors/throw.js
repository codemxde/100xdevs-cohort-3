class AuthenticationError extends Error {
  constructor(message = "Failed to validate client", statusCode = 403) {
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
  constructor(message = "User not found", statusCode = 404) {
    super(message);
    this.statusCode = statusCode;
    this.name = "UserNotFoundError";
  }
}

class AdminNotFoundError extends Error {
  constructor(message = "Admin not found", statusCode = 404) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AdminNotFoundError";
  }
}

class CourseNotFoundError extends Error {
  constructor(message = "Unable to find course for update", statusCode = 409) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CourseNotFoundError";
  }
}

class ExistingPurchaseError extends Error {
  constructor(message = "You have already bought this course!") {
    super(message);
    this.statusCode = 409;
    this.name = "ExistingPurchaseError";
  }
}

module.exports = {
  AuthenticationError,
  InvalidPayloadSchema,
  UserNotFoundError,
  AdminNotFoundError,
  CourseNotFoundError,
  ExistingPurchaseError,
};
