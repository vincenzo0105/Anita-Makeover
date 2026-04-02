const express = require("express");
const router = express.Router();
const { Cashfree } = require("cashfree-pg");

// ✅ Initialize Cashfree SDK
if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
  console.error("❌ CASHFREE_APP_ID or CASHFREE_SECRET_KEY not set in .env");
}

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = "SANDBOX"; // Use string, not enum

router.post("/create-order", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone, bookingId } = req.body;

    // ✅ Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const orderRequest = {
      order_amount: Math.round(amount),
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

    console.log("🔥 Creating Cashfree order with:", orderRequest);

    // Create order with Cashfree
    const response = await Cashfree.PGOrderCreate("2023-08-01", orderRequest);

    console.log("📦 Full Cashfree response:", JSON.stringify(response, null, 2));

    // Extract the actual data
    const orderData = response?.data || response;

    if (!orderData?.payment_session_id) {
      console.error("❌ No payment_session_id in response:", orderData);
      return res.status(400).json({
        error: "Failed to create payment session",
        response: orderData
      });
    }

    console.log("✅ Payment session created:", orderData.payment_session_id);

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      status: orderData.order_status
    });
  } catch (error) {
    // Improved error logging for the new SDK structure
    console.error("❌ CASHFREE ERROR:", error.response ? error.response.data : error.message);
    
    res.status(500).json({
      error: "Payment error",
      details: error.response ? error.response.data.message : error.message
    });
  }
});

module.exports = router;