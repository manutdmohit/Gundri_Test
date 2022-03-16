const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');

const Room = require('../models/Room');

const Stay = require('../models/Stay');

const { checkPermissions } = require('../utils');

// @desc Create Room
// @route POST /api/v1/rooms
// @access Private
exports.createRoom = async (req, res) => {
  // let { stay } = req.body;

  // const stays = await Stay.find({ createdBy: req.user.userId });

  // const staysId = stays.map((s) => s.id);

  const room = await Room.create({
    ...req.body,
    createdBy: req.user.userId,
    // stay: staysId.includes(stay) ? stay : null,
  });

  res.status(StatusCodes.CREATED).json({
    room,
  });
};

exports.getAllRooms = async (req, res) => {
  const rooms = await Room.find({});

  res.status(StatusCodes.OK).json({ count: rooms.length, rooms });
};

exports.getSingleRoom = async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id });

  if (!room) {
    throw new CustomError.NotFoundError(
      `No room found with id ${req.params.id}`
    );
  }

  res.status(StatusCodes.OK).json({ room });
};

exports.updateRoom = async (req, res) => {
  const room = await Room.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    throw new CustomError.NotFoundError(
      `No room found with id ${req.params.id}`
    );
  }

  checkPermissions(req.user, room.createdBy);

  res.status(StatusCodes.OK).json({ room });
};

exports.deleteRoom = async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id });

  if (!room) {
    throw new CustomError.NotFoundError(
      `No room found with id ${req.params.id}`
    );
  }

  checkPermissions(req.user, room.createdBy);

  await room.remove();

  res.status(StatusCodes.OK).json({ msg: 'room deleted' });
};
