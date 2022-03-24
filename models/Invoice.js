const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: mongoose.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    mobileNumber: {
      type: Number,
      required: [true, 'Please provide mobile number'],
    },
    stayStars: {
      type: Number,
    },
    stayName: {
      type: String,
    },
    stayLocation: {
      type: String,
    },
    roomType: {
      type: [Object],
      required: [true, 'Please provide type of the room'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Please provide price of the room'],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);
