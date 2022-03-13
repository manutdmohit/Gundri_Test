const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');

const Stay = require('../models/Stay');

// @desc Create Stay(Hotel)
// @route POST /api/v1/hotels/create
// @access Private
exports.createStay = async (req, res) => {
  const { name } = req.body;

  const checkName = await Stay.findOne({ name });

  if (checkName) {
    throw new CustomError.BadRequestError(
      'Hotel already exists. Try to create another hotel.'
    );
  }

  const stay = await Stay.create(req.body);

  res.status(StatusCodes.CREATED).json({
    stay,
  });
};

// @desc Get All Stays
// @route GET /api/v1/hotels
// @access Public
exports.getHotels = async (req, res) => {
  const stays = await Stay.find({});

  res.status(StatusCodes.OK).json({
    count: stays.length,
    stays,
  });
};
