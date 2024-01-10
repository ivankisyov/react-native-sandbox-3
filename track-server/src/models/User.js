const mongoose = require("mongoose");

// Create a schema for the user model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, // Prevents duplicate emails
    required: true, // Email is required
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Create a model for the user schema
mongoose.model("User", userSchema);
