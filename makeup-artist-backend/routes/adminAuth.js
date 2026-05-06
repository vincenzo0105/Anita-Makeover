const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if credentials are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Validate admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: "admin" },
        JWT_SECRET,
        { expiresIn: "10s" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    }

    // Invalid credentials
    return res.status(401).json({
      message: "Invalid credentials",
    });

  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;