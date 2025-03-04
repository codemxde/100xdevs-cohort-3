const { z } = require("zod");

const { Course } = require("../../models/course.model");
const { ObjectId } = require("mongoose").Types;

const errors = require("../../errors/throw");
const { checkAndValidateErrors: handleError } = require("../../errors/catch");

const log = require("../../logger/logger");

const validateCourse = (req, res, next) => {
  try {
    const courseSchema = z
      .object({
        title: z.string().min(1).max(32),
        description: z.string().max(100),
        price: z.number(),
        imageUrl: z.string(),
      })
      .strict();

    const parseresult = courseSchema.safeParse(req.body);

    if (!parseresult.success) {
      throw new errors.InvalidPayloadSchema();
    }

    req.creatorId = req.admin.id;

    console.log(log.middleware("Course schema validated... calling next middleware"));

    next();
  } catch (error) {
    handleError(error, res, "Course schema validation failed");
  }
};

const validateUpdate = (req, res, next) => {
  try {
    const validateCourseId = z.string().refine((val) => ObjectId.isValid(val), {
      message: "Course ID is invalid",
    });

    const updateSchema = z
      .object({
        courseId: validateCourseId.optional().refine((val) => val !== undefined, {
          message: "Course ID is required",
        }),
        title: z.string().min(1).max(32).optional(),
        description: z.string().max(100).optional(),
        price: z.number().optional(),
        imageUrl: z.string().optional(),
      })
      .strict()
      .refine((data) => Object.keys(data).length > 1, {
        message: "Can not perform empty update",
      });

    const parseResult = updateSchema.safeParse(req.body);

    if (!parseResult.success) {
      // parseResult.error.issues.forEach(printValidationError);
      console.log(log.fail(parseResult.error.issues[0].message));
      throw new errors.InvalidPayloadSchema();
    }

    console.log(log.middleware("Update schema validation successful... calling next middleware"));

    next();
  } catch (error) {
    handleError(error, res, "Failed to update course details");
  }
};

const validatePurchase = (req, res, next) => {
  try {
    const courseIdSchema = z.string().refine((val) => ObjectId.isValid(val), {
      message: "Invalid course object id",
    });

    const purchaseSchema = z
      .object({
        courseId: courseIdSchema.optional().refine((val) => val !== undefined, {
          message: "Course id field can not be empty",
        }),
      })
      .strict();

    const parseResult = purchaseSchema.safeParse(req.body);

    if (!parseResult.success) {
      console.log(log.fail(parseResult.error.issues[0].message));
      throw new errors.InvalidPayloadSchema();
    }

    console.log(log.middleware("Course purchase schema validated... calling next middleware"));

    next();
  } catch (error) {
    handleError(error, res, "Unable to validate request body");
  }
};

const courseExists = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      throw new errors.CourseNotFoundError("No matching course found for given purchase", 404);
    }

    console.log(log.middleware("Course found in database... calling next middleware"));

    next();
  } catch (error) {
    handleError(error, res, "Unable to verify if course exists");
  }
};

const printValidationError = (issue) => console.log(log.fail(issue.message));

module.exports = { validateCourse, validateUpdate, validatePurchase, courseExists };
