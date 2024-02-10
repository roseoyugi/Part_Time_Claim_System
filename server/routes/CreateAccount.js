const express = require("express");
const { users } = require("../models");
const bcrypt = require("bcrypt");
const sendEmail = require("../utilities/sendEmail");
const { websiteUrl } = require("../utilities/Constants");

const router = express.Router();

router.post("/", async (req, res) => {
  const { password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await users.create({
    ...req.body,
    password: hash,
  });

  const user = req.body;

  const subject = "CREATION OF YOUR CLAIM PORTAL ACCOUNT!";
  const message = `<p>Your claim portal account has been created <p/>
                     <p> Click <a href=${websiteUrl}>here</a> to login with "${user.password}" as the password</p>
                      `;

  sendEmail(user.name, user.email, subject, message);

  res.json("Successfully created account for: " + req.body.name);
});

module.exports = router;
