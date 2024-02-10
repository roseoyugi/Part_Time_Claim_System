const express = require("express");
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ where: { email: email } });
  if (!user) {
    res.json({ error: "User does not exist!" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.json({ error: "Wrong username or password!" });
    return;
  }

  const accessToken = sign({ email: user.email, id: user.id }, "secretKey");
  res.json({ user: user, accessToken: accessToken });
});

module.exports = router; 
