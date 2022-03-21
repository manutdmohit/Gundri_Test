const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: mongoose.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    room: {
      type: mongoose.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = InvoiceSchema;
