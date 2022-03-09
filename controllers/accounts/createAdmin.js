const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

const Admin = require('../../models/Accounts/Admin');
// const Admin = require('../../models/Accounts/Admin');

// @desc Create Admin
// @route POST /api/v1/admins
// @access Private
exports.createAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);

  res.status(StatusCodes.CREATED).json({
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.lastName,
    country: admin.country,
    mobileNumber: admin.mobileNumber,
    address1: admin.address1,
    address2: admin.address2,
  });
};
