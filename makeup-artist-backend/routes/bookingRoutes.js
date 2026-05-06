console.log("🔥 THIS IS THE REAL BACKEND FILE");

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Dynamic import for node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// ===============================
// 📌 GET ALL BOOKINGS
// ===============================
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// 📌 CREATE NEW BOOKING
// ===============================
router.post("/", async (req, res) => {
  try {
    console.log("BOOKING ROUTE HIT 🚀");
    console.log("Incoming booking:", req.body);

    const booking = new Booking({
      service: req.body.service,
      addOns: req.body.addOns,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message,
      totalAmount: req.body.totalAmount,
      status: "Pending",
    });

    const saved = await booking.save();
    console.log("SAVED EMAIL IN DB:", saved.email);

    res.status(201).json(saved);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// 📌 UPDATE STATUS + SEND EMAIL
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("Status updated:", req.body.status);
    console.log("Updated booking:", updated);

    

    let subject = "";
    let html = "";

    // ===============================
    // 💄 APPROVED EMAIL
    // ===============================
    if (req.body.status === "Approved") {
      
      const QRCode = require("qrcode");

const upiLink = `upi://pay?pa=omk145593@okaxis&pn=Anita%20Makeover&am=${updated.amountToPay}&cu=INR&tn=Booking%20Payment`;

const qrBase64 = await QRCode.toDataURL(upiLink);

      subject = "Your Booking Has Been Approved 💄";
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #e91e63;">Anita's Makeover</h2>
          <h3>Hello ${updated.name},</h3>
          <p>We are delighted to inform you that your booking has been <strong>approved</strong>.</p>
          
          <table style="border-collapse: collapse; width: 100%; margin: 15px 0;">
            <tr><td><strong>Service:</strong></td><td>${updated.service}</td></tr>
            <tr><td><strong>Date:</strong></td><td>${updated.date}</td></tr>
            <tr><td><strong>Time:</strong></td><td>${updated.time}</td></tr>
            <tr><td><strong>Total Amount:</strong></td><td>₹${updated.totalAmount}</td></tr>
          </table>

          <p>Please complete your payment using the QR code below:</p>

<p>
  <strong>Scan QR Code to Pay:</strong>
</p>

<p>
  <img 
    src="${qrBase64}" 
    alt="UPI QR Code"
    style="width:220px; height:220px; border:1px solid #ddd; border-radius:10px;"
  />
</p>
<p>If you are unable to see QR Code, please use the UPI ID below to make the payment:</p>
<p>
  <strong>UPI ID:</strong> omk145593@okaxis
</p>

          <p>After payment, please fill out this google form to confirm your payment: https://docs.google.com/forms/d/e/1FAIpQLSczwiDs41nSSPoW3Vlj-o7tSrSTKa3kHAUbi5ujBcsfwua4eg/viewform?usp=dialog</p>

          <p style="margin-top: 20px;">
            Thank you for choosing <strong>Anita's Makeover</strong>. We look forward to serving you.
          </p>

          <p>Warm regards,<br/><strong>Anita's Makeover Team</strong></p>
        </div>
      `;
    }

    // ===============================
    // ❌ CANCELLED EMAIL
    // ===============================
    else if (req.body.status === "Cancelled") {
      subject = "Your Booking Has Been Cancelled";
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #e91e63;">Anita's Makeover</h2>
          <h3>Hello ${updated.name},</h3>
          <p>We regret to inform you that your booking has been cancelled.</p>

          <table style="border-collapse: collapse; width: 100%; margin: 15px 0;">
            <tr><td><strong>Service:</strong></td><td>${updated.service}</td></tr>
            <tr><td><strong>Date:</strong></td><td>${updated.date}</td></tr>
            <tr><td><strong>Time:</strong></td><td>${updated.time}</td></tr>
          </table>

          <p>Please feel free to book another appointment at your convenience.</p>

          <p>Best regards,<br/><strong>Anita's Makeover Team</strong></p>
        </div>
      `;
    }

    // ===============================
    // 💰 PAYMENT CONFIRMATION EMAIL
    // ===============================
    else if (req.body.status === "Paid") {
      subject = "Payment Confirmed – Booking Successful ✅";
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #e91e63;">Anita's Makeover</h2>
          <h3>Hello ${updated.name},</h3>
          <p>Your payment has been received successfully.</p>
          <p>Your booking is now <strong>confirmed</strong>.</p>

          <table style="border-collapse: collapse; width: 100%; margin: 15px 0;">
            <tr><td><strong>Service:</strong></td><td>${updated.service}</td></tr>
            <tr><td><strong>Date:</strong></td><td>${updated.date}</td></tr>
            <tr><td><strong>Time:</strong></td><td>${updated.time}</td></tr>
            <tr><td><strong>Total Amount:</strong></td><td>₹${updated.totalAmount}</td></tr>
          </table>

          <p>We look forward to enhancing your natural beauty. 💄</p>

          <p>Warm regards,<br/><strong>Anita's Makeover Team</strong></p>
        </div>
      `;
    }

    // ===============================
    // 📧 SEND EMAIL USING RESEND
    // ===============================
    if (subject && html && updated.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Anita's Makeover <booking@anitasmakeover.in>",
          to: updated.email,
          subject,
          html,
        }),
      });

      console.log("📧 Email sent to:", updated.email);
    }

    res.json(updated);
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;