const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');

const Room = require('../models/Room');

const Stay = require('../models/Stay');

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

exports.getRooms = async (req, res) => {
  const rooms = await Room.find({});

  res.status(StatusCodes.OK).json(rooms);
};
