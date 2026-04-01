const express = require("express");
const router = express.Router();
const Cashfree = require("cashfree-pg");

// Initialize Cashfree
Cashfree.setup({
  mode: "sandbox",
  appId: process.env.CASHFREE_APP_ID,
  appSecret: process.env.CASHFREE_SECRET_KEY
});

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
      order_tags: {
        bookingId: bookingId
      },
      order_meta: {
        return_url: "https://makeup-artist-website-two.vercel.app/payment-success",
      },
    };

    const response = await Cashfree.PGOrderCreate(orderRequest);

    res.json({
      payment_session_id: response.payment_session_id,
      order_id: response.order_id,
      ...response
    });
  } catch (error) {
    console.error("❌ CASHFREE ERROR FULL:", error);
    res.status(500).json({
      error: "Payment error",
      details: error.message
    });
  }
}
);

module.exports = router;