const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const Customer = require('../../models/Accounts/Customer');

// @desc Create Customer
// @route POST /api/v1/customers
// @access Public
exports.createCustomer = async (req, res) => {
  const { email } = req.body;

  // Check whether the email is already present in the database or not
  const checkEmail = await Customer.findOne({ email });
  if (checkEmail) {
    throw new CustomError.BadRequestError(
      'Email already exists. Try with another email.'
    );
  }

  const customer = await Customer.create(req.body);

  res.status(StatusCodes.CREATED).json({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.lastName,
    country: customer.country,
    mobileNumber: customer.mobileNumber,
    address1: customer.address1,
    address2: customer.address2,
  });
};
