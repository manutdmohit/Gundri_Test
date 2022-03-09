const { StatusCodes } = require('http-status-codes');

const CustomError = require('../../errors');

// @desc Create Admin
// @route POST /api/v1/admins
// @access Private
const Admin = require('../../models/Accounts/Admin');

exports.createAdmin = async (req, res) => {
  const { email } = req.body;

  // Check whether the email is already present in the database or not
  const checkEmail = await Admin.findOne({ email });
  if (checkEmail) {
    throw new CustomError.BadRequestError(
      'Email already exists. Try with another email.'
    );
  }

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
