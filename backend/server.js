// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
// Parse incoming JSON requests
app.use(express.json());
// Enable CORS for cross-origin requests from frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Import User model and bcrypt for password hashing
const User = require("./User");
const bcrypt = require("bcryptjs");

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route for health check
app.get("/", (req, res) => {
  res.send("API is running");
});

// Test routes for debugging connectivity
app.get("/api/test", (req, res) => {
  res.json({ message: "Test route working" });
});

app.post("/api/test", (req, res) => {
  console.log("Test route hit:", req.body);
  res.json({ message: "Test route working" });
});

// Signup route
app.post("/api/signup", async (req, res) => {
  console.log("Signup route hit:", req.body);
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, and role are required." });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const roleMessage =
      user.role === "admin" ? "Welcome Admin" : "Welcome Customer";
    res.status(200).json({ message: roleMessage });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});
// ...existing code...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
