const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ⚠️ IMPORTANT: Cashfree sends raw body sometimes
router.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log("💰 Cashfree Webhook:", data);

    const bookingId = data?.order?.order_tags?.bookingId;
    const paymentStatus = data?.order?.order_status;

    // ✅ Only mark as paid if SUCCESS
    if (paymentStatus === "PAID" && bookingId) {
      await Booking.findByIdAndUpdate(bookingId, {
        status: "Paid"
      });

      console.log("✅ Booking marked as Paid:", bookingId);
    }

    res.sendStatus(200);

  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;