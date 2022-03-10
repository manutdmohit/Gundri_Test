const { StatusCodes } = require('http-status-codes');

const { createTokenUser, attachCookiesToResponse } = require('../../utils');

const CustomError = require('../../errors');

const Admin = require('../../models/Accounts/Admin');
const Customer = require('../../models/Accounts/Customer');
const GuestCustomer = require('../../models/Accounts/GuestCustomer');
const Partner = require('../../models/Accounts/Partner');

const { createGuestCustomer } = require('./guestcustomerController');

// @desc Create Admin
// @route POST /api/v1/admins
// @access Private
exports.createAdmin = async (req, res) => {
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

  const admin = await Admin.create(req.body);

  // Generating Token
  const tokenUser = createTokenUser(admin);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
