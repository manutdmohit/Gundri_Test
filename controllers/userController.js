const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const CustomError = require('../errors');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

// @desc Get All Users
// @route /api/users
// @access Private and Admin Only
exports.getAllUsers = async (req, res) => {
  const users = await User.find({})
    .populate('stays')
    .populate('rooms')
    .select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users });
};

// @desc Get All Customers
// @route /api/users/customers
// @access Private and Admin Only
exports.getAllCustomers = async (req, res) => {
  const users = await User.find({ role: 'customer' }).select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users });
};

// @desc Get All Guests
// @route /api/users/guests
// @access Private and Admin Only
exports.getAllGuests = async (req, res) => {
  const users = await User.find({ role: 'guest' }).select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users });
};

// @desc Get All Partners
// @route /api/users/partners
// @access Private and Admin Only
exports.getAllPartners = async (req, res) => {
  const users = await User.find({ role: 'partner' })
    .populate('stays')
    .select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users });
};

exports.getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
    .populate('stays')
    .select('-password');

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
  }

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

exports.showCurrentLoggedInUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// Update user with findOne and save
exports.updateUser = async (req, res) => {
  const { firstName, lastName, mobileNumber, email } = req.body;

  if (!firstName || !lastName || !mobileNumber || !email) {
    1;
    throw new CustomError.BadRequestError('Please provide all values');
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomError.NotFoundError(
      `No user found with id ${req.params.id}`
    );
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.mobileNumber = mobileNumber;
  user.email = email;

  await user.save();

  const tokenUser = createTokenUser(user);

  const token = attachCookiesToResponse({ res, user: tokenUser });

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

// Update partner with findOne and save
exports.updatePartner = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password, verified } =
    req.body;

  if (!firstName || !lastName || !mobileNumber || !email) {
    1;
    throw new CustomError.BadRequestError('Please provide all values');
  }

  const user = await User.findById(req.params.id);

  checkPermissions(req.user, user._id);

  user.firstName = firstName;
  user.lastName = lastName;
  user.mobileNumber = mobileNumber;
  user.email = email;
  user.verified = verified;

  user.password = password;

  await user.save();

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

exports.updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new CustomError.NotFoundError(
      'Please provide current password and new password'
    );
  }

  const user = await User.findOne({ _id: req.user.userId });

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

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new CustomError.NotFoundError(
      `No user found with id ${req.params.id}`
    );
  }

  user.remove();

  res.status(StatusCodes.OK).json({ msg: 'user removed' });
};
