const express = require("express");
const { users } = require("../models");

const router = express.Router();

router.get("/managers", async (req, res) => {
  try {
    const listOfManagers = await users.findAll({
      where: {
        role: "manager",
      },
    });
    res.json(listOfManagers);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await users.findByPk(id);
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

module.exports = router;
