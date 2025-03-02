const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const CourseSchema = new Schema({
  title: { type: String, unique: String },
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const Course = model("courses", CourseSchema);

module.exports = { Course };
