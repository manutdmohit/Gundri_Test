const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');

const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Stay = require('../models/Stay');
const Invoice = require('../models/Invoice');

// @desc Create Invoice
// @route POST /api/v1/invoice
// @access Private

const createInvoice = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select('-password');

  const booking = await Booking.findOne({
    _id: req.params.id,
  });

  console.log(booking);
  if (!booking) {
    throw new CustomError.NotFoundError(
      `No Booking found with id ${req.params.id}`
    );
  }

  let stay = await Stay.findOne({ stay: booking.stay });

  let rooms = booking.rooms;

  const invoiceCount = await Invoice.find();

  if (invoiceCount.length > 0) {
    const data = await Invoice.findOne({ bookingNumber: req.params.id });

    const bookingNumber = data.bookingNumber.toString();

    if (bookingNumber === req.params.id) {
      throw new CustomError.BadRequestError('Booking already present');
    }
  }

  const invoice = await Invoice.create({
    bookingNumber: booking.id,
    firstName: user.firstName,
    address: user.address,
    stayStars: stay.stars,
    stayName: stay.name,
    staylocation: stay.location,
    mobileNumber: user.mobileNumber,
    roomType: rooms,
    totalAmount: booking.totalAmount,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
  });
  res.status(StatusCodes.CREATED).json({
    invoice,
  });
};

module.exports = createInvoice;
