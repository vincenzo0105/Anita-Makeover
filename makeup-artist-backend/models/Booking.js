const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  addOns: [
    {
      type: String
    }
  ],
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  status: {
  type: String,
  default: "Pending"
}
}, {
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);