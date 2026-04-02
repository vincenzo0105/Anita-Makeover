const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ⚠️ IMPORTANT: Webhook endpoint - receives Cashfree payment notifications
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    console.log("💰 Cashfree Webhook received:", JSON.stringify(data, null, 2));

    const bookingId = data?.order?.order_tags?.bookingId;
    const paymentStatus = data?.order?.order_status;

    console.log("🔍 Webhook - BookingId:", bookingId, "Status:", paymentStatus);

    // ✅ Only mark as paid if SUCCESS
    if (paymentStatus === "PAID" && bookingId) {
      await Booking.findByIdAndUpdate(bookingId, {
        status: "Paid"
      });

      console.log("✅ Booking marked as Paid:", bookingId);
    }

    res.sendStatus(200);

  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;