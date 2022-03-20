const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    stay: {
      type: mongoose.Types.ObjectId,
      ref: 'Stay',
      required: true,
    },
    room_type: {
      type: mongoose.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    bookedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    paymentType: {
      type: String,
      enum: {
        values: ['Pay on Arrival', 'Pay Later'],
        message: '{VALUE} is not supported',
      },
      default: 'Pay on Arrival',
    },
    bookingDate: {
      type: Date,
      default: Date.now(),
    },
    bookingDueDate: {
      type: Date,
      default: Date.now() + 1000 * 60 * 60 * 24,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
