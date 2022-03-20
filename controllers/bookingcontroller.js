const { StatusCodes } = require('http-status-codes');

const Booking = require('../models/Booking');
const Stay = require('../models/Stay');
const Room = require('../models/Room');

const CustomError = require('../errors');

const createBooking = async (req, res) => {
  let { stay, room_type, price, totalRooms } = req.body;

  let totalPrice;
  totalPrice = price * totalRooms;

  if (!room_type) {
    throw new CustomError.BadRequestError('Please provide room type');
  }

  let stays = await Stay.find({});
  stays = stays.map((stay) => stay.id);

  let rooms = await Room.find({});
  rooms = rooms.map((room) => room.id);

  if (!stays.includes(stay) || !rooms.includes(room_type)) {
    throw new CustomError.BadRequestError('Stay or Room not found');
  }

  const booking = await Booking.create({
    ...req.body,
    room_type,
    totalPrice,
    bookedBy: req.user.userId,
    stay,
  });

  res.status(StatusCodes.OK).json({ booking });
};

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({})
    .populate({
      path: 'bookedBy',
      select: 'firstName lastName address',
    })
    .populate('stay')
    .populate('room_type');

  res.status(StatusCodes.CREATED).json({ bookings });
};

const getAllBookingsByLoggedInUser = async (req, res) => {
  const bookings = await Booking.find({ createdBy: req.user.userId }).populate(
    'stay'
  );

  res.status(StatusCodes.CREATED).json({ count: bookings.length, bookings });
};

const getSingleBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id });

  if (!booking) {
    throw new CustomError.NotFoundError(
      `No Booking found with id ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({ booking });
};

const updateBooking = async (req, res) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!booking) {
    throw new CustomError.NotFoundError(
      `No booking found with id ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({ booking });
};

const deleteBooking = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id });

  if (!booking) {
    throw new CustomError.NotFoundError(
      `No Booking found with id ${req.params.id}`
    );
  }

  await booking.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: `The booking ${req.params.id} has been deleted` });
};

module.exports = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getAllBookingsByLoggedInUser,
  updateBooking,
  deleteBooking,
};
