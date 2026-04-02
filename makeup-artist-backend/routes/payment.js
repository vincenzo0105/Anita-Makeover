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

    console.log("📝 Payment request received:", { amount, customerName, customerEmail, customerPhone, bookingId });

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

    console.log("🔥 Sending to Cashfree:", JSON.stringify(orderRequest, null, 2));

    // Create order with Cashfree v4.0.10
    let response;
    try {
      response = await Cashfree.PGOrderCreate("2023-08-01", orderRequest);
    } catch (cfError) {
      console.error("❌ Cashfree PGOrderCreate error:", cfError);
      throw cfError;
    }

    console.log("✅ Cashfree Response received:", JSON.stringify(response, null, 2));

    // Extract order data - handle both v4 response structures
    const orderData = response?.data || response;

    console.log("📦 Order data extracted:", orderData);

    if (!orderData?.payment_session_id) {
      console.error("❌ Missing payment_session_id. Full response:", JSON.stringify(response, null, 2));
      return res.status(500).json({
        error: "Failed to generate payment session",
        debug: {
          response: orderData,
          error: "payment_session_id missing"
        }
      });
    }

    console.log("✅ Order created successfully. Session ID:", orderData.payment_session_id);

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      cf_order_id: orderData.cf_order_id
    });

  } catch (error) {
    console.error("❌ Payment creation error (full error):", error);
    console.error("Error stack:", error.stack);
    console.error("Error response:", error.response);
    
    res.status(500).json({
      error: "Payment error",
      details: error.response?.data?.message || error.message,
      debug: error.response?.data
    });
  }
});

module.exports = router;