const express = require("express");
const router = express.Router();

let cfConfig;
let CFPaymentGatewayService;

try {
  const cashfree = require("cashfree-pg");
  CFPaymentGatewayService = cashfree;
  
  // Initialize Configuration for v4
  cfConfig = {
    environment: "SANDBOX",
    version: "2023-08-01",
    client_id: process.env.CASHFREE_APP_ID,
    client_secret: process.env.CASHFREE_SECRET_KEY
  };
  
  // Set credentials
  cashfree.XClientId = process.env.CASHFREE_APP_ID;
  cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
  cashfree.XEnvironment = "SANDBOX";
  
  console.log("✅ Cashfree SDK loaded and configured");
} catch (err) {
  console.error("❌ Failed to load Cashfree SDK:", err.message);
}

router.post("/create-order", async (req, res) => {
  try {
    if (!CFPaymentGatewayService) {
      return res.status(500).json({ error: "Cashfree SDK not loaded" });
    }

    const { amount, customerName, customerEmail, customerPhone, bookingId } = req.body;

    console.log("📝 Payment request received:", { amount, customerName, customerEmail, customerPhone, bookingId });

    // Validate input
    if (!amount || amount <= 0 || !bookingId) {
      return res.status(400).json({ error: "Invalid amount or bookingId" });
    }

    // Build the Order Request
    const cfOrderRequest = {
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

    console.log("🔥 Creating Cashfree order:", JSON.stringify(cfOrderRequest, null, 2));

    // Call Cashfree to create order
    const response = await CFPaymentGatewayService.PGOrderCreate("2023-08-01", cfOrderRequest);

    console.log("✅ Cashfree response:", JSON.stringify(response, null, 2));

    // Extract order data
    const orderData = response?.data || response;

    if (!orderData?.payment_session_id) {
      console.error("❌ Missing payment_session_id in response:", orderData);
      return res.status(500).json({
        error: "Failed to generate payment session",
        debug: orderData
      });
    }

    console.log("✅ Order created. Session ID:", orderData.payment_session_id);

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      cf_order_id: orderData.cf_order_id
    });

  } catch (error) {
    console.error("❌ Payment creation error:", error);
    console.error("Error stack:", error.stack);
    
    res.status(500).json({
      error: "Payment error",
      details: error.response?.data?.message || error.message,
      debug: error.response?.data
    });
  }
});

module.exports = router;