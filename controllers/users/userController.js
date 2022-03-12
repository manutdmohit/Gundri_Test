const { StatusCodes } = require('http-status-codes');

const Customer = require('../../models/Accounts/Customer');
const GuestCustomer = require('../../models/Accounts/GuestCustomer');
const Partner = require('../../models/Accounts/Partner');

const CustomError = require('../../errors');
const { createTokenUser, attachCookiesToResponse } = require('../../utils');
// const {
//   createTokenUser,
//   attachCookiesToResponse,
//   checkPermissions,
// } = require('../utils');

// @desc Get All Customers
// @route GET /api/v1/customers
// @access Private
exports.getAllCustomers = async (req, res) => {
  const users = await Customer.find({}).select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users });
};

// @desc Get Single Customer
// @route GET /api/v1/customers/:id
// @access Private
exports.getSingleCustomer = async (req, res) => {
  const user = await Customer.findOne({ _id: req.params.id }).select(
    '-password'
  );

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

// @desc Get Delete Customer
// @route DELETE /api/v1/customers/:id
// @access Private
exports.deleteCustomer = async (req, res) => {
  const user = await Customer.findOne({ _id: req.params.id });

  if (!user) {
    throw new CustomError.NotFoundError(
      `No customer found with id ${req.params.id}`
    );
  }

  await user.remove();

  res.status(StatusCodes.OK).json({ msg: 'Customer removed' });
};

// @desc Get All Guest Customers
// @route GET /api/v1/guests
// @access Private
exports.getAllGuestCustomers = async (req, res) => {
  const users = await GuestCustomer.find({}).select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users });
};

// @desc Get Single Guest Customer
// @route GET /api/v1/guests/:id
// @access Private
exports.getSingleGuestCustomer = async (req, res) => {
  const user = await GuestCustomer.findOne({ _id: req.params.id }).select(
    '-password'
  );

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

// @desc Get Delete Guest Customer
// @route DELETE /api/v1/guests/:id
// @access Private
exports.deleteGuestCustomer = async (req, res) => {
  const user = await GuestCustomer.findOne({ _id: req.params.id });

  if (!user) {
    throw new CustomError.NotFoundError(
      `No guest customer found with id ${req.params.id}`
    );
  }

  await user.remove();
  res.status(StatusCodes.OK).json({ msg: ' Guest customer removed' });
};

// @desc Get All Partners
// @route GET /api/v1/partners
// @access Private
exports.getAllPartners = async (req, res) => {
  const users = await Partner.find({}).select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users });
};

// @desc Get Single Partner
// @route GET /api/v1/partners/:id
// @access Private
exports.getSinglePartner = async (req, res) => {
  const user = await Partner.findOne({ _id: req.params.id }).select(
    '-password'
  );

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

// @desc Get Delete partner
// @route DELETE /api/v1/partners/:id
// @access Private
exports.deletePartner = async (req, res) => {
  const user = await Partner.findOne({ _id: req.params.id });

  if (!user) {
    throw new CustomError.NotFoundError(
      `No partner found with id ${req.params.id}`
    );
  }

  await user.remove();
  res.status(StatusCodes.OK).json({ msg: 'Partner removed' });
};

// Update user with findOne and save
exports.updateCustomer = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    country,
    address1,
    address2,
  } = req.body;

  if (!firstName || !lastName || !email || !country) {
    throw new CustomError.NotFoundError('Please provide all values');
  }

  const user = await Customer.findOne({ _id: req.params.id });

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.mobileNumber = mobileNumber;
  user.country = country;
  user.address1 = address1;
  user.address2 = address2;

  await user.save();

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

exports.updateCustomerPassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    throw new CustomError.NotFoundError('Please provide all values');
  }

  const user = await Customer.findOne({ email });

  if (!user) {
    throw new CustomError.NotFoundError('No user found ');
  }

  // Check current password
  const matchCurrentPassword = await user.comparePassword(currentPassword);

  if (!matchCurrentPassword) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;

  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Success! Password Updated Successfully' });
};
