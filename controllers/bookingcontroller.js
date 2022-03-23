const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const Booking = require('../models/Booking');
const Stay = require('../models/Stay');
const Room = require('../models/Room');

const CustomError = require('../errors');

const createBooking = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  let { stay, room_type, totalRooms } = req.body;

  // console.log(room_type);

  let stays = await Stay.find({});
  stays = stays.map((stay) => stay.id);

  // console.log(stays);

  let rooms = await Room.find({});
  rooms = rooms.map((room) => room.id);

  let values = [];
  for (i = 0; i < room_type.length && totalRooms.length; i++) {
    let room = await Room.findOne({ _id: room_type[i] });
    if (!stays.includes(stay) || !rooms.includes(room_type[i])) {
      throw new CustomError.BadRequestError('Stay or Room not found');
    }
    values.push({ room, totalRooms: totalRooms[i] });
  }

  const data = values.map((value) => {
    let totalRooms = value.totalRooms;

    if (totalRooms > value.room.quantity) {
      throw new CustomError.BadRequestError(
        'Please check the number of rooms available'
      );
    }

    const roomType = value.room.type;
    const price = value.room.price;

    let totalPrice;
    totalPrice = price * totalRooms;

    if (!room_type) {
      throw new CustomError.BadRequestError('Please provide room type');
    }

    return {
      price,
      totalRooms,
      totalPrice,
      roomType,
    };
  });

  const booking = await Booking.create({
    ...req.body,
    rooms: data,
    bookedBy: req.user.userId,
    stay,
  });

  res.status(StatusCodes.OK).json(booking);
};

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({});

  res.status(StatusCodes.OK).json({ count: bookings.count, bookings });
};

const getAllBookingsByLoggedInUser = async (req, res) => {
  const bookings = await Booking.find({ createdBy: req.user.userId }).populate(
    'stay'
  );

  res.status(StatusCodes.OK).json({ count: bookings.length, bookings });
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
