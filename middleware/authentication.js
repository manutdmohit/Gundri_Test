const CustomError = require('../errors');

// const jwt = require('jsonwebtoken');

const { isTokenValid } = require('../utils');

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;

  // Not Signedin or logout
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { firstName, lastName, email, userId, mobileNumber, role } =
      isTokenValid({
        token,
      });

    req.user = {
      firstName,
      lastName,
      mobileNumber,
      email,
      userId,
      role,
    };

    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
