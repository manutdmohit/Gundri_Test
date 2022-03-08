const res = require('express/lib/response');
const { StatusCodes } = require('http-status-codes');

const Hotel = require('../models/Hotel');

// @desc Get All Hotels
// @route GET /api/v1/hotels
// @access Public
exports.createHotel = async (req, res) => {
  const hotel = await Hotel.create(req.body);

  res.status(StatusCodes.OK).json({ hotel });
};

// @desc Get All Hotels
// @route GET /api/v1/hotels
// @access Public
exports.getHotels = async (req, res) => {
  const hotel = await Hotel.find({}).limit(8).sort('-hotel_stars');
  res.status(StatusCodes.OK).json({ count: hotel.length, hotel });
};

// @desc Get Single Hotel
// @route GET /api/v1/hotels/:slug
// @access public
exports.getHotel = async (req, res) => {
  const hotel = await Hotel.findOne({ hotel_slug: req.params.slug });

  res.status(StatusCodes.OK).json({ hotel });
};
