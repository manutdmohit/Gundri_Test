const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const { createTokenUser, attachCookiesToResponse } = require('../../utils');

const Admin = require('../../models/Accounts/Admin');
const Customer = require('../../models/Accounts/Customer');
const GuestCustomer = require('../../models/Accounts/GuestCustomer');
const Partner = require('../../models/Accounts/Partner');

// @desc Create Guest Customer
// @route POST /api/v1/guestcustomers
// @access Public
exports.createGuestCustomer = async (req, res) => {
  const { email } = req.body;

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

  const customer = await GuestCustomer.create(req.body);

  // Generating Token
  const tokenUser = createTokenUser(customer);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
