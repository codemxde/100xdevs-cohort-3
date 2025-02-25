const jwt = require("jsonwebtoken");

const value = {
  fname: "keshav",
  accountNumber: 12341234,
};

const token = jwt.sign(value, "secret");
console.log(token);
