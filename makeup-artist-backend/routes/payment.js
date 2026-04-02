const express = require("express");
const router = express.Router();
const Cashfree = require("cashfree-pg");

// Initialize Cashfree SDK v4.0.10
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = "SANDBOX"; // Use string, not enum

router.post("/create-order", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone, bookingId } = req.body;

    // Validate input
    if (!amount || amount <= 0 || !bookingId) {
      return res.status(400).json({ error: "Invalid amount or bookingId" });
    }

    const orderRequest = {
      order_amount: parseFloat(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: `CUST_${bookingId}`,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
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

    console.log("🔥 Creating Cashfree order:", orderRequest);

    // Use PGOrderCreate for v4.0.10
    const response = await Cashfree.PGOrderCreate("2023-08-01", orderRequest);

    console.log("✅ Cashfree Response:", JSON.stringify(response, null, 2));

    // Extract order data
    const orderData = response.data;

    if (!orderData?.payment_session_id) {
      console.error("❌ Missing payment_session_id in response");
      return res.status(500).json({
        error: "Failed to generate payment session",
        response: orderData
      });
    }

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      cf_order_id: orderData.cf_order_id
    });

  } catch (error) {
    console.error("❌ Payment creation error:", error.response?.data || error.message);
    
    res.status(500).json({
      error: "Payment error",
      details: error.response?.data?.message || error.message
    });
  }
});

module.exports = router;