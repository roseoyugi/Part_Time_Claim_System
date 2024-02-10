const express = require("express");
const { jobs } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const job = req.body;
    await jobs.create(job);
    res.json("Job Added Successfully!");
  } catch (error) {
    console.log(error.message);
    res.json("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const listOfJobs = await jobs.findAll();
    res.json(listOfJobs);
  } catch (error) {
    console.log(error.message);
    res.json("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobs.findByPk(jobId);
    res.json(job);
  } catch (error) {
    console.log(error.message);
    res.json("Internal Server Error");
  }
});

module.exports = router;
