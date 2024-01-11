const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, "MY_SECRET_KEY");

    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // If the user did not provide an email or password, return an error
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Must provide an email and password" });
  }

  // Find the user by their email address
  const user = await User.findOne({ email });

  // If the user was not found, return an error
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    // Otherwise, compare the provided password with the password in the database
    await user.comparePassword(password);
    // If they match, generate a token
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    // Send the token to the user
    res.send({ token });
  } catch (error) {
    // If they do not match, return an error
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
