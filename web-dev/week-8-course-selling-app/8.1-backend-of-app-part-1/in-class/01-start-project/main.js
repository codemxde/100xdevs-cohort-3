require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app/app");
const logger = require("./app/logger/logger");

(async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(logger.success("Connection with Database Established..."));
    app.listen(process.env.PORT, () => {
      console.log(
        logger.success("Application is live on Port ") +
          logger.viewPort(process.env.PORT) +
          "\n"
      );
    });
  } catch (error) {
    console.log(
      logger.fail("Failed to Start Application... Check Database Connection!\n")
    );
    process.exit(1);
  }
})();
