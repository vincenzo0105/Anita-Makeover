console.log("🔥 THIS IS THE REAL BACKEND FILE");

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer"); // ✅ NEW

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST booking
router.post("/", async (req, res) => {
  try {
    console.log("BOOKING ROUTE HIT 🚀");
    console.log("Incoming booking:", req.body);

    const booking = new Booking({
      service: req.body.service,
      addOns: req.body.addOns,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message,
      status: "Pending"
    });

    const saved = await booking.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE status + SEND EMAIL
router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: "after" }
    );

    console.log("Status updated:", req.body.status);
console.log("Updated booking FULL:", updated);
    // 👉 ADD THIS BLOCK
    if (req.body.status === "Approved") {
      console.log("EMAIL TRIGGERED");

      // call your payment route or generate link
      const paymentLink = `https://makeup-artist-website-two.vercel.app/payment/${updated._id}`;

      // send email
      await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from: "onboarding@resend.dev",
    to: updated.email,
    subject: "Complete Your Booking Payment 💄",
    html: `
      <h2>Your booking is approved!</h2>
      <p>Please complete your payment:</p>
      <a href="${paymentLink}">Pay Now</a>
    `
  }),
});

      console.log("📧 Email sent to:", updated.email);
    }

    res.json(updated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;