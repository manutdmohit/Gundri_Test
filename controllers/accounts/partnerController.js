const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const Admin = require('../../models/Accounts/Admin');
const Customer = require('../../models/Accounts/Customer');
const GuestCustomer = require('../../models/Accounts/GuestCustomer');
const Partner = require('../../models/Accounts/Partner');

const { createTokenUser, attachCookiesToResponse } = require('../../utils');

// @desc Create Partner
// @route POST /api/v1/partners
// @access Private
exports.createPartner = async (req, res) => {
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

  const partner = await Partner.create(req.body);

  // Generating Token
  const tokenUser = createTokenUser(partner);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
