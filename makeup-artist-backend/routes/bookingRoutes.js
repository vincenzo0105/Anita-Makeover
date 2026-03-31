console.log("🔥 THIS IS THE REAL BACKEND FILE");
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ONLY ONE POST ROUTE
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

// UPDATE status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;