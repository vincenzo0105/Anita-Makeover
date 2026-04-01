const express = require("express");
const router = express.Router();
const { Cashfree } = require("cashfree-pg");

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = "sandbox";

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
        return_url: "http://makeup-artist-website-two.vercel.app/payment-success",
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment error" });
  }
});

module.exports = router;