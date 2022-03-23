// @desc Create Invoice
// @route POST /api/v1/invoice
// @access Private
const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Stay = require('../models/Stay');
const Invoice = require('../models/Invoice');

const { StatusCodes } = require('http-status-codes');

const createInvoice = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select('-password');

  const booking = await Booking.findOne({
    _id: req.params.id,
  });

  let stay = await Stay.findOne({ stay: booking.stay });

  let rooms = booking.rooms;

  const totalAmount = rooms.reduce((prev, curr) =>
    Number(prev.totalPrice + curr.totalPrice, 0)
  );

  console.log(totalAmount);

  const invoice = await Invoice.create({
    bookingNumber: booking.id,
    firstName: user.firstName,
    address: user.address,
    stayStars: stay.stars,
    stayName: stay.name,
    staylocation: stay.location,
    mobileNumber: user.mobileNumber,
    roomType: rooms,
    totalAmount,
  });

  res.status(StatusCodes.CREATED).json({
    invoice,
  });
};

module.exports = createInvoice;
