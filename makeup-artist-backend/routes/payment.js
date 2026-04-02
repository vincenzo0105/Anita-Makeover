const express = require("express");
const router = express.Router();
// IMPORTANT: v4 uses these specific names
const { 
  CFConfig, 
  CFPaymentGatewayService, 
  CFEnvironment, 
  CFOrderRequest 
} = require("cashfree-pg-sdk-nodejs"); 

// Initialize Configuration outside the route
const client_id = process.env.CASHFREE_APP_ID;
const client_secret = process.env.CASHFREE_SECRET_KEY;
const environment = CFEnvironment.SANDBOX; // Change to PRODUCTION when live

const cfConfig = new CFConfig(environment, "2023-08-01", client_id, client_secret);

router.post("/create-order", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone } = req.body;

    // 1. You must create an instance of CFOrderRequest in v4
    const cfOrderRequest = new CFOrderRequest();
    cfOrderRequest.order_amount = parseFloat(amount);
    cfOrderRequest.order_currency = "INR";
    cfOrderRequest.customer_details = {
      customer_id: "cust_" + Date.now(),
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone
    };
    cfOrderRequest.order_meta = {
      return_url: "https://makeup-artist-website-two.vercel.app/payment-success?order_id={order_id}"
    };

    console.log("🚀 Sending order to Cashfree v4...");

    // 2. The method name in v4 is 'cfCreateOrder'
    const response = await CFPaymentGatewayService.cfCreateOrder(cfConfig, cfOrderRequest);

    // 3. Response is inside .data
    const orderData = response.data;

    res.json({
      payment_session_id: orderData.payment_session_id,
      order_id: orderData.order_id,
      ...orderData
    });

  } catch (error) {
    // Log the actual error to your Render console so you can see it
    const errorMsg = error.response ? error.response.data : error.message;
    console.error("❌ SDK ERROR:", errorMsg);

    res.status(500).json({
      error: "Payment error",
      details: errorMsg
    });
  }
});

module.exports = router;