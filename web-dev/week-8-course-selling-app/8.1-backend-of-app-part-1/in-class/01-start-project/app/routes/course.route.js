const { Router } = require("express");
const router = Router();

const { Course } = require("../models/course.model");
const { Purchase } = require("../models/purchase.model");

router.post("/purchase", async (req, res) => {});

router.get("/preview", async (req, res) => {});

module.exports = { router };
