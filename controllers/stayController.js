const { StatusCodes } = require('http-status-codes');

const CustomError = require('../errors');

const Stay = require('../models/Stay');

const { checkPermissions } = require('../utils');

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

  const stay = await Stay.create({ ...req.body, createdBy: req.user.userId });

  res.status(StatusCodes.CREATED).json({
    stay,
  });
};

// @desc Get All Stays
// @route GET /api/v1/hotels
// @access Public
exports.getStays = async (req, res) => {
  const stays = await Stay.find({}).populate({
    path: 'createdBy',
    select: 'firstName lastName',
  });

  res.status(StatusCodes.OK).json({
    count: stays.length,
    stays,
  });
};

exports.getSingleStay = async (req, res) => {
  const stay = await Stay.findOne({
    _id: req.params.id,
  }).select('-createdBy');

  if (!stay) {
    throw new CustomError.NotFoundError(`No stay with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ stay });
};

exports.updateStay = async (req, res) => {
  const stay = await Stay.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!stay) {
    throw new CustomError.NotFoundError('No stay found');
  }

  checkPermissions(req.user, stay.createdBy);

  res.status(StatusCodes.OK).json({ stay });
};

exports.deleteStay = async (req, res) => {
  const stay = await Stay.findOne({ _id: req.params.id });

  if (!stay) {
    throw new CustomError.NotFoundError(`No stay with id ${req.params.id}`);
  }

  checkPermissions(req.user, stay.createdBy);

  await stay.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Stay removed.' });
};
