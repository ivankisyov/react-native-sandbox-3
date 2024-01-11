const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", function (next) {
  // If the password has not been modified, continue
  if (!this.isModified("password")) {
    return next();
  }

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      this.password = hash; // Replace the user provided password with the hash
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  // Create a new promise
  return new Promise((resolve, reject) => {
    // Compare the candidate password with the password in the database
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      // If they do not match, reject the promise
      if (!isMatch) {
        return reject(false);
      }

      // Otherwise, resolve the promise
      resolve(true);
    });
  });
};

// Create a model for the user schema
mongoose.model("User", userSchema);
