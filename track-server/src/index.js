require("./models/Track");
require("./models/User");
require("dotenv").config({
  path: "../.env",
});
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const mongoose = require("mongoose");
const requireAuth = require("./middlewares/requireAuth");

const mongoUri = `mongodb+srv://devvanks:${process.env.MONGODB_PASS}@cluster0.katlwe8.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/", requireAuth, (req, res) => {
  console.log(req.user);
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
