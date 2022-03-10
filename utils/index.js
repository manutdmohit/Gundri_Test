const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');

const createTokenUser = require('./createTokenUser');

const checkPermissions = require('./CheckPermissions');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
};
