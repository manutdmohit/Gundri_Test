const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    room_types: {
      type: String,
    },
    adults: {
      type: Number,
    },
    childrens: {
      type: Number,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    amenities: {
      type: [String],
    },
    bookedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
