const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const serviceRoutes = require("./routes/serviceRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/uploads", express.static("uploads"));
// MongoDB connection (ADD THIS)
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