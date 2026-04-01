const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
// routes
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const portfolioRoutes = require("./routes/portfolio");
const adminAuthRoutes = require("./routes/adminAuth");
const paymentRoutes = require("./routes/payment"); // ✅ NEW
const webhookRoutes = require("./routes/paymentWebhook");


// ✅ FIRST: middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://makeup-artist-website-two.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// ✅ THEN: routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/portfolio", portfolioRoutes);
app.use("/admin", adminAuthRoutes);
app.use("/api/payment", paymentRoutes); // ✅ NEW
app.use("/api/payment", webhookRoutes);

// static
app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("Makeup Artist Backend API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});