const express = require("express");
const router = express.Router();
const { Cashfree } = require("cashfree-pg"); // Destructure Cashfree

// Initialize the SDK configuration
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX; // Use the built-in enum

router.post("/create-order", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone, bookingId } = req.body;

    const orderRequest = {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: "cust_" + Date.now(),
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        // Ensure this URL is correct for your frontend
        return_url: "https://makeup-artist-website-two.vercel.app/payment-success?order_id={order_id}",
      },
      order_tags: {
        bookingId: bookingId.toString() // Tags usually need to be strings
      },
    };

    console.log("🔥 Creating Cashfree order...");

    // FIX: In the new SDK, use Cashfree.PGOrderCreate
    const response = await Cashfree.PGOrderCreate("2023-08-01", orderRequest);

    // The data is contained within response.data in the new SDK
    const orderData = response.data;

    console.log("✅ Cashfree response success");

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      ...orderData
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