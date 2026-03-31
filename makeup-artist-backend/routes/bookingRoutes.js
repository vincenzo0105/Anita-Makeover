console.log("🔥 THIS IS THE REAL BACKEND FILE");

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer"); // ✅ NEW

// ✅ EMAIL SETUP (add once at top)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
      { new: true }
    );

    // 🎯 SEND EMAIL ONLY IF APPROVED
    if (req.body.status === "Approved") {
      const paymentLink = `https://makeup-artist-website-two.vercel.app/payment/${updated._id}`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: updated.email,
        subject: "Your Booking is Approved 🎉",
        html: `
          <h2>Hello ${updated.name},</h2>
          <p>Your booking has been approved by the artist.</p>
          <p>Please complete your payment using the link below:</p>
          <a href="${paymentLink}" target="_blank">Pay Now 💳</a>
          <br/><br/>
          <p>Looking forward to your glam session ✨</p>
        `,
      });

      console.log("📧 Email sent to:", updated.email);
    }

    res.json(updated);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;