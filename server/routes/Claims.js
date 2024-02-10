const express = require("express");
const { claims, users } = require("../models");
const Sequelize = require("sequelize");
const { websiteUrl } = require("../utilities/Constants");
const sendEmail = require("../utilities/sendEmail");

const router = express.Router();

router.get("/", async (req, res) => {
  const listOfClaims = await claims.findAll();
  res.json(listOfClaims);
});

router.get("/pending", async (req, res) => {
  const listOfClaims = await claims.findAll({ where: { status: "pending" } });
  res.json(listOfClaims);
});

router.get("/reviewed", async (req, res) => {
  const listOfClaims = await claims.findAll({
    where: {
      status: {
        [Sequelize.Op.not]: "pending",
      },
    },
  });
  res.json(listOfClaims);
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const listOfClaims = await claims.findAll({ where: { user_id: userId } });
  res.json(listOfClaims);
});

router.patch("/:id", async (req, res) => {
  try {
    await claims.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );

    const claim = await claims.findByPk(req.params.id);
    const user = await users.findByPk(claim.user_id);

    const claimDate = new Date(claim.date);
    const formattedDate = claimDate.toLocaleDateString();

    const subject = "CLAIM REVIEWED!";
    const message = `<p>Your claim of ${claim.hours} hours worked, on ${formattedDate} has been ${claim.status}<p/>
                     <p> Click <a href=${websiteUrl}>here</a> to log in and view your claim status</p>
                      `;

    sendEmail(user.name, user.email, subject, message);

    res.json("Status updated successfully");
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

module.exports = router;
