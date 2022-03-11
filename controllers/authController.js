const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password } = req.body;

  // Check whether the email is already present in the database or not
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    throw new CustomError.BadRequestError(
      'Email already exists. Try with another email.'
    );
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'customer';

  const user = await User.create({
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
    role,
  });

  // Generating Token
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

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

const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = { register, login, logout };
