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

  if (!password) {
    throw new CustomError.BadRequestError('Please provide password');
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

  const token = attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
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

  const token = attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const registerPartner = async (req, res) => {
  const role = 'partner';
  const verified = false;

  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    city,
    state,
    address1,
    address2,
    country,
    centralName,
  } = req.body;

  // Check whether the email is already present in the database or not
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    throw new CustomError.BadRequestError(
      'Email already exists. Try with another email.'
    );
  }

  if (!address1 || !address2 || !city || !state || !country || !centralName) {
    throw new CustomError.BadRequestError('Please enter all values');
  }

  const user = await User.create({
    firstName,
    lastName,
    mobileNumber,
    email,
    role,
    verified,
    country,
    address1,
    address2,
    state,
    city,
    centralName,
  });

  // Generating Token
  const tokenUser = createTokenUser(user);

  const token = attachCookiesToResponse({ res, user: tokenUser, token });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const loginPartner = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.BadRequestError('Invalid Credentials');
  }

  if (!user.verified) {
    throw new CustomError.UnauthenticatedError(
      'Unauthorized to access this route'
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // Generating Token
  const tokenUser = createTokenUser(user);

  const token = attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser, token });
};

const registerGuest = async (req, res) => {
  const role = 'guest';

  const {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    address,
    country,
  } = req.body;

  // Check whether the email is already present in the database or not
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    throw new CustomError.BadRequestError(
      'Email already exists. Try with another email.'
    );
  }

  if (!password) {
    throw new CustomError.BadRequestError('Please provide password');
  }

  if (!address || !country) {
    throw new CustomError.BadRequestError('Please provide all values');
  }

  const user = await User.create({
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
    role,
    country,
    address,
  });

  // Generating Token
  const tokenUser = createTokenUser(user);

  const token = attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};

const logot = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  loginPartner,
  registerGuest,
  registerPartner,
  logout,
};
