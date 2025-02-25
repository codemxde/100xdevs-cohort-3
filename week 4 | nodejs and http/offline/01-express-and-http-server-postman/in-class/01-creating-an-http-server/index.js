// * creating an http server
// * express => not a node 'default library'

const express = require("express");

// * creating the clinic
app = express();

function calculateSum(num) {
  let sum = 0;
  for (let i = 0; i <= num; i++) {
    sum += i;
  }
  return sum;
}

app.get("/", function (req, res) {
  // * extracting query param from URL
  const n = req.query.n;
  const sum = calculateSum(n);
  res.send("The requested sum is: " + sum);
});

app.listen(3000);
