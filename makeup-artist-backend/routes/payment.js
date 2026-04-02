const express = require("express");
const router = express.Router();
// Use the installed cashfree-pg package v4.0.10
const Cashfree = require("cashfree-pg");

// Initialize Configuration
const client_id = process.env.CASHFREE_APP_ID;
const client_secret = process.env.CASHFREE_SECRET_KEY;

Cashfree.XClientId = client_id;
Cashfree.XClientSecret = client_secret;
Cashfree.XEnvironment = "SANDBOX";

console.log("✅ Cashfree SDK initialized");

router.post("/create-order", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone, bookingId } = req.body;

    console.log("📝 Payment request:", { amount, bookingId });

    // Validate input
    if (!amount || amount <= 0 || !bookingId) {
      return res.status(400).json({ error: "Invalid amount or bookingId" });
    }

    // Build order request for cashfree-pg v4
    const orderRequest = {
      order_amount: parseFloat(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: `CUST_${bookingId}`,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone
      },
      order_meta: {
        return_url: `https://makeup-artist-website-two.vercel.app/payment?bookingId=${bookingId}`,
        notify_url: "https://makeup-artist-website-two.onrender.com/api/payment/webhook"
      },
      order_tags: {
        bookingId: bookingId
      },
      order_note: "Makeup Booking Payment"
    };

    console.log("🔥 Creating order with Cashfree...");

    // Use PGOrderCreate method from cashfree-pg
    const response = await Cashfree.PGOrderCreate("2023-08-01", orderRequest);

    console.log("✅ Response:", JSON.stringify(response, null, 2));

    // Extract order data
    const orderData = response?.data || response;

    if (!orderData?.payment_session_id) {
      console.error("❌ Missing payment_session_id");
      return res.status(500).json({
        error: "Failed to create payment session",
        debug: orderData
      });
    }

    console.log("✅ Order created:", orderData.payment_session_id);

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      cf_order_id: orderData.cf_order_id
    });

  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Error details:", error.response?.data);
    
    res.status(500).json({
      error: "Payment error",
      details: error.response?.data?.message || error.message
    });
  }
});

module.exports = router;