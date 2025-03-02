const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const Admin = model("admin", AdminSchema);

module.exports = { Admin };
