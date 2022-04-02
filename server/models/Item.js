const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    default: "",
    required: true,
  },
  companyName: {
    type: String,
    default: "",
    required: true,
  },
  itemPrice: {
    type: String,
    default: "",
    required: true,
  },
  manufacteringDate: {
    type: String,
    default: "",
    required: true,
  },
  expiryDate: {
    type: String,
    default: "",
    required: true,
  },
  quantity: {
    type: String,
    default: "",
    required: true,
  },
  success: {
    type: Boolean,
    default: true,
    required: false,
  },
  ready: {
    type: String,
    default: "",
    required: false,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
