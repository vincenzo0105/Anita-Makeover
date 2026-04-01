const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: {
    type: String,
    required: [true, "Service is required"]
  },

  addOns: [
    {
      type: String
    }
  ],

  name: {
    type: String,
    required: [true, "Name is required"]
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
  },

  address: {
    type: String,
    required: [true, "Address is required"]
  },

  city: {
    type: String,
    required: [true, "City is required"]
  },

  date: {
    type: String,
    required: [true, "Date is required"]
  },

  time: {
    type: String,
    required: [true, "Time is required"]
  },

  message: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);