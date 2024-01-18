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

// Create a new track for the current user
router.post("/tracks", async (req, res) => {
  // Get the name and locations from the request body
  const { name, locations } = req.body;

  // If there is no name or locations, return an error
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide a name and locations." });
  }

  try {
    // Create a new track
    const track = new Track({ name, locations, userId: req.user._id });

    // Save the track to the database
    await track.save();

    // Send the track back to the user
    res.send(track);
  } catch (err) {
    // If there is an error, return a 422 error
    res.status(422).send({ error: err.message });
  }
});

const mockTrackJSON = JSON.stringify({
  name: "My new track",
  locations: [
    {
      timestamp: 100000000,
      coords: {
        latitude: 37.33233,
        longitude: -122.03121,
        altitude: 10,
        accuracy: 5,
        heading: 0,
        speed: 0,
      },
    },
    {
      timestamp: 100000000,
      coords: {
        latitude: 37.33233,
        longitude: -122.03121,
        altitude: 10,
        accuracy: 5,
        heading: 0,
        speed: 0,
      },
    },
  ],
});

module.exports = router;
