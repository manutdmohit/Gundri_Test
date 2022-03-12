const { StatusCodes } = require('http-status-codes');

const { createTokenUser, attachCookiesToResponse } = require('../../utils');

const CustomError = require('../../errors');

const Admin = require('../../models/Accounts/Admin');
const Customer = require('../../models/Accounts/Customer');
const GuestCustomer = require('../../models/Accounts/GuestCustomer');
const Partner = require('../../models/Accounts/Partner');

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

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await Admin.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // Generating Token
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

exports.logoutAdmin = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
