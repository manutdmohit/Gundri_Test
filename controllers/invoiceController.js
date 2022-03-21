const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');

// @desc Create Invoice
// @route POST /api/v1/invoice
// @access Private

const { StatusCodes } = require('http-status-codes');

const createInvoice = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select('-password');

  const booking = await Booking.findOne({ bookedBy: req.user.userId });

  const room = await Room.findOne({ _id: booking.room_type });

  console.log(room);

  res.status(StatusCodes.CREATED).json({
    bookingNumber: booking.id,
    firstName: user.firstName,
    address: user.address,
    mobileNumber: user.mobileNumber,
    roomType: room.room_type,
    price: booking.price,
  });
};

module.exports = createInvoice;
