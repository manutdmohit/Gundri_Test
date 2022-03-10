const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');

const hashPassword = require('../utils/hashPassword');

const createTokenUser = require('./createTokenUser');

const checkPermissions = require('./CheckPermissions');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  hashPassword,
};
