const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const Admin = require('../../models/Accounts/Admin');
const Customer = require('../../models/Accounts/Customer');
const GuestCustomer = require('../../models/Accounts/GuestCustomer');
const Partner = require('../../models/Accounts/Partner');

const { createTokenUser, attachCookiesToResponse } = require('../../utils');

// @desc Create Customer
// @route POST /api/v1/customers
// @access Public
exports.createCustomer = async (req, res) => {
  const { email } = req.body;

  // Check whether the email is already present in the database or not
  const checkEmail =
    (await Customer.findOne({ email })) ||
    (await Admin.findOne({ email })) ||
    (await GuestCustomer.findOne({ email })) ||
    (await Partner.findOne({ email }));

  if (checkEmail) {
    throw new CustomError.BadRequestError(
      'Email already exists. Try with another email.'
    );
  }

  const customer = await Customer.create(req.body);

  // Generating Token
  const tokenUser = createTokenUser(customer);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
