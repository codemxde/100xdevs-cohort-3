const { Purchase } = require("../../models/purchase.model");

const { checkAndValidateErrors: handleError } = require("../../errors/catch");

const errors = require("../../errors/throw");

const log = require("../../logger/logger");

const fetchCourses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const purchases = await Purchase.find({ userId });

    req.purchases = purchases;

    console.log(log.middleware("Fetched purchases bought by user... calling next middleware"));

    next();
  } catch (error) {
    handleError(error, res, "Failed to fetch courses purchased by user");
  }
};

const checkPreviousPurchase = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const purchase = await Purchase.findOne({ courseId, userId });

    if (purchase) {
      throw new errors.ExistingPurchaseError();
    }

    console.log(
      log.middleware(
        "User is attempting to purchase course for the first time... calling next middleware"
      )
    );

    next();
  } catch (error) {
    handleError(error, res, "Failed to check if user previously bought this course");
  }
};

module.exports = { fetchCourses, checkPreviousPurchase };
