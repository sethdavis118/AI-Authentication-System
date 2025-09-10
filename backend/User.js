const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // User's email address (must be unique)
  email: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  // Hashed password
  password: {
    type: String,
    required: true,
  },
  // Role of the user: 'admin' or 'user'
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
});

 // Export the User model for use in other files
 module.exports = mongoose.model("User", userSchema);
