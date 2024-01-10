const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    res.send("You made a post request");
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

module.exports = router;
