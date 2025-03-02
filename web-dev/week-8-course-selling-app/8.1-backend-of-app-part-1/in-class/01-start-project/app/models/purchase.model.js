const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const PurchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const Purchase = model("purchases", PurchaseSchema);

module.exports = { Purchase };
