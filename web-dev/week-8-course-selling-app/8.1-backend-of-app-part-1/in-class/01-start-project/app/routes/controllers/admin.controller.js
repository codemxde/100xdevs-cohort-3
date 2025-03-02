const { Router } = require("express");
const router = Router();
const { Admin } = require("../../models/admin.model");

router.post("/signup", async (req, res) => {});

router.post("/signin", async (req, res) => {});

// add a course
router.post("/course", async (req, res) => {});

// change course info/image/description etc.
router.put("/course", async (req, res) => {});

// give the admin all the courses they have created
router.get("/course/all", async (req, res) => {});

module.exports = { router };
