const express = require("express");
const app = express();

const { router: userRouter } = require("./routes/user.route");
const { router: courseRouter } = require("./routes/course.route");
const { router: adminRouter } = require("./routes/admin.route");

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

module.exports = app;
