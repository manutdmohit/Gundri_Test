const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    stay: {
      type: mongoose.Types.ObjectId,
      ref: 'Stay',
      required: true,
    },
    roomType: {
      type: [mongoose.Types.ObjectId],
      ref: 'Room',
      required: true,
    },
    rooms: {
      type: [Object],
    },
    totalRooms: {
      type: [Number],
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    bookedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentType: {
      type: String,
      enum: {
        values: ['Pay on Arrival', 'Pay Later'],
        message: '{VALUE} is not supported',
      },
      default: 'Pay on Arrival',
    },
    checkIn: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    CheckOut: {
      type: Date,
      required: true,
      default: Date.now() + 1000 * 60 * 60 * 24,
    },
    invoice: {
      type: mongoose.Types.ObjectId,
      ref: 'Invoice',
    },
  },
  {
    timestamps: true,
  }
);

// Cascade delete invoices when a booking is deleted
BookingSchema.pre('remove', async function (next) {
  console.log(`Courses being removed from bootcamp ${this._id}`);
  await this.model('invoice').deleteMany({ bookingNumber: this._id });
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);
