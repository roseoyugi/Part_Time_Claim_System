const express = require("express");
const { departments } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const department = req.body;
    await departments.create(department);
    res.json("Department Added Successfully!");
  } catch (error) {
    console.log(error.message);
    res.json("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const listOfDepartments = await departments.findAll();
    res.json(listOfDepartments);
  } catch (error) {
    console.log(error.message);
    res.json("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const departmentId = req.params.id;
    const department = await departments.findOne({
      where: { id: departmentId },
    });
    res.json(department);
  } catch (error) {
    console.log(error.message);
    res.json("Internal Server Error");
  }
});

module.exports = router;
