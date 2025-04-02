const express = require("express");

app = express();

app.use(express.json());

const user = [
  {
    fname: "John Doe",
    kidneys: [{ healthy: false }],
  },
];

const isThereNoUnhealthyKidney = () => {
  const john = user[0];
  const arr = john.kidneys.filter((kidney) => !kidney.healthy);
  return arr.length === 0 ? true : false;
};

app.get("/", function (req, res) {
  // * function to get status of all kidneys
  const kidneys = user[0].kidneys;
  const numberOfKidneys = kidneys.length;

  const healthyKidneys = kidneys.filter((kidney) => kidney.healthy);
  const numberOfHealthyKidneys = healthyKidneys.length;

  const numberOfUnhealthyKidneys = kidneys.length - healthyKidneys.length;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.post("/", function (req, res) {
  // * function to add a new kidney
  const isHealthy = req.body.isHealthy;
  const kidneys = user[0].kidneys;
  kidneys.push({ healthy: isHealthy });

  res.json({
    msg: "Done!",
  });
});

app.put("/", function (req, res) {
  // * check whether even we should perform the operation
  if (isThereNoUnhealthyKidney()) {
    res.status(411).json({
      msg: "You have no bad kidneys to replace",
    });
  }

  // * function to update all kidneys to healthy
  const john = user[0];
  for (let i = 0; i < john.kidneys.length; i++) {
    john.kidneys[i].healthy = true;
  }

  res.json({});
});

app.delete("/", function (req, res) {
  // * check whether even we should perform the operation
  if (isThereNoUnhealthyKidney()) {
    res.status(411).json({
      msg: "You have no bad kidneys to remove",
    });
  }

  // * function which deletes all the unhealthy kidneys
  const john = user[0];
  const arr = john.kidneys.filter((kidney) => kidney.healthy);
  john.kidneys = arr;

  res.json({ msg: "removed bad kidneys!" });
});

app.listen(3000);
