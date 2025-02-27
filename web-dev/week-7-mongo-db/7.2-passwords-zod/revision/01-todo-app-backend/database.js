const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
  email: String,
  password: String,
  name: String,
});

const Todos = new Schema({
  description: String,
  status: Boolean,
  userId: ObjectId,
});

const UserModel = mongoose.model("user", User);
const TodoModel = mongoose.model("todos", Todos);

module.exports = { UserModel, TodoModel };
