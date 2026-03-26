const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  available: Boolean,
  image: String,     // 👈 add this
  features: [String],// 👈 add this
  duration: String   // 👈 add this
});

module.exports = mongoose.model("Service", serviceSchema);