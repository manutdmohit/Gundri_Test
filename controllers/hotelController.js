const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');

const Hotel = require('../models/Hotel');

// @desc Create Hotel
// @route POST /api/v1/hotels
// @access Private
exports.createHotel = async (req, res) => {
  const hotel = await Hotel.create(req.body);

  res.status(StatusCodes.CREATED).json({ hotel });
};

// @desc Get All Hotels
// @route GET /api/v1/hotels
// @access Public
exports.getHotels = async (req, res) => {
  const hotels = await Hotel.find({}).limit(8).sort('-hotel_stars');

  res.status(StatusCodes.OK).json({ count: hotels.length, hotels });
};

// @desc Get Single Hotel
// @route GET /api/v1/hotels/:slug
// @access public
exports.getHotel = async (req, res) => {
  const hotel = await Hotel.findOne({ hotel_slug: req.params.slug });

  if (!hotel) {
    throw new CustomError.NotFoundError(
      `No hotel found with name ${req.params.slug}`
    );
  }

  res.status(StatusCodes.OK).json({ hotel });
};
