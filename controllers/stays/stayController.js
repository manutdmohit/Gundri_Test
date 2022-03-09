const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const Stay = require('../../models/Stays/Stay');

// @desc Create Customer
// @route POST /api/v1/customers
// @access Private
exports.createStay = async (req, res) => {
  const stay = await Stay.create(req.body);

  res.status(StatusCodes.CREATED).json({
    stay,
  });
};
