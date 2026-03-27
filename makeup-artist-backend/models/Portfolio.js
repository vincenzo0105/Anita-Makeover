const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);