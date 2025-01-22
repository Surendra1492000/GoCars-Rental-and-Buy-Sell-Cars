const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, unique: true, required: true },
  pricePerDay: { type: Number, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
  imageUrl: { type: String },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Car", carSchema);
