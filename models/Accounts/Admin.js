const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { hashPassword } = require('../../utils');

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide First Name'],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide Last Name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide Email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide Password'],
      minlength: 6,
    },
    mobileNumber: {
      type: String,
      minlength: 10,
    },
    country: {
      type: 'String',
      required: [true, 'Please provide Country Name'],
    },
    address1: {
      type: String,
      default: '',
    },
    address2: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);

// Hashing Password
hashPassword(AdminSchema);

// Comparing Password
AdminSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Admin', AdminSchema);
