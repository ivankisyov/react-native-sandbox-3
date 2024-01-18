const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");
const router = express.Router();

router.use(requireAuth);

// Get all tracks for the current user
router.get("/tracks", async (req, res) => {
  // Find all tracks for the current user
  const tracks = await Track.find({ userId: req.user._id });

  // Send the tracks back to the user
  res.send(tracks);
});

module.exports = router;
