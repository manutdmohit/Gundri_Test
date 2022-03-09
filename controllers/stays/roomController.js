const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const Room = require('../../models/Stays/Room');

// @desc Create Room
// @route POST /api/v1/rooms
// @access Private
exports.createRoom = async (req, res) => {
  const stay = await Room.create(req.body);

  res.status(StatusCodes.CREATED).json({
    stay,
  });
};
