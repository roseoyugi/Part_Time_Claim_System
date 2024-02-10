const express = require("express");
const { claims, jobs, departments, users } = require("../models");
const multer = require("multer");
const sendEmail = require("../utilities/sendEmail");
const { websiteUrl } = require("../utilities/Constants");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.json(req.file.filename);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const claim = req.body;
    await claims.create(claim);

    const jobId = claim.job_id;
    const job = await jobs.findByPk(jobId);
    const depId = job.department_id;
    const dep = await departments.findByPk(depId);
    const manId = dep.manager_id;
    const manager = await users.findByPk(manId);
    const claimant = await users.findByPk(claim.user_id);

    const subject = "NEW CLAIM SUBMITTED!";
    const message = `<p>A new claim has been submitted by ${claimant.name}<p/>
                     <p> Click <a href=${websiteUrl}>here</a> to review the claim</p>
                      `;

    sendEmail(manager.name, manager.email, subject, message);

    res.json("Claim Submitted Successfully!");
  } catch (error) {
    console.error(error.message);
    res.json("Internal Server Error");
  }
});

module.exports = router;
