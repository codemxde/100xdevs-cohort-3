const express = require("express");

app = express();

function isOldEnough(req, res, next) {
  const age = req.query.age;
  if (age > 14) {
    next();
  } else {
    res.status(411).json({
      msg: "Sorry, you're not old enough to ride",
    });
  }
}

/*app.get("/ride1", isOldEnough, function (req, res) {
  res.status(200).send("Enjoy the first ride!");
});

app.get("/ride2", isOldEnough, function (req, res) {
  res.status(200).send("Enjoy the second ride");
});*/

// # Observation
// * Each route always needs the 'isOldEnough' method to get called
// * as a pre-curser to the original method
// * Express, gives us a way in which for every route, this partiuclar 'checker/middleware'
// * function will always automatically get called first, before the actual route implementatio

app.get("/ride", function (req, res) {
  res.send("No checks needed here! Just have fun.");
});

// # Implementation
app.use(isOldEnough);

// * This line ensures this 'isOldEnough' middleware fn always gets called for each route
// * defined below on the app

// ! NOTE
// * app.use(fnName) only calls fnName for the routes defined BELOW IT

app.get("/ride1", function (req, res) {
  res.status(200).send("Enjoy the first ride!");
});

app.get("/ride2", function (req, res) {
  res.status(200).send("Enjoy the second ride");
});

app.listen(3000);
