const express = require("express");
const app = express();

const { router: userRouter } = require("./routes/controllers/user.controller");
const {
  router: courseRouter,
} = require("./routes/controllers/course.controller");

const {
  router: adminRouter,
} = require("./routes/controllers/admin.controller");

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

module.exports = app;
