const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const Partner = require('../../models/Accounts/Partner');

// @desc Create Partner
// @route POST /api/v1/partners
// @access Private
exports.createPartner = async (req, res) => {
  const { email } = req.body;

  // Check whether the email is already present in the database or not
  const checkEmail = await Partner.findOne({ email });
  if (checkEmail) {
    throw new CustomError.BadRequestError(
      'Email already exists. Try with another email.'
    );
  }

  const partner = await Partner.create(req.body);

  res.status(StatusCodes.CREATED).json({
    firstName: partner.firstName,
    lastName: partner.lastName,
    email: partner.lastName,
    country: partner.country,
    mobileNumber: partner.mobileNumber,
    address1: partner.address1,
    address2: partner.address2,
    assignHotels: partner.assignHotels,
    assignRentals: partner.assignRentals,
  });
};
