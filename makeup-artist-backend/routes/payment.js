const express = require("express");
const router = express.Router();
const { Cashfree } = require("cashfree-pg");

// Initialize with Client ID and Secret
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

router.post("/create-order", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone, bookingId } = req.body;

    const orderRequest = {
      order_amount: parseFloat(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: "CUST_" + bookingId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: "https://makeup-artist-website-two.vercel.app/payment?bookingId=" + bookingId,
        notify_url: "https://makeup-artist-website-two.onrender.com/api/payment/webhook"
      },
      order_tags: {
        bookingId: bookingId
      },
      order_note: "Makeup Booking Payment"
    };

    console.log("🔥 Creating Cashfree order...");

    // Use PGCreateOrder not PGOrderCreate
    const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);

    const orderData = response.data;

    console.log("✅ Order Created:", orderData.cf_order_id);

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      ...orderData
    });

  } catch (error) {
    const errorData = error.response ? error.response.data : error.message;
    console.error("❌ CASHFREE ERROR:", errorData);
    
    res.status(500).json({
      error: "Payment error",
      details: errorData
    });
  }
});

module.exports = router;