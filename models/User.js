const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      minlength: 3,
      maxlength: 50,
    },
    mobileNumber: {
      type: String,
      minlength: 10,
      required: [true, 'Please provide mobile number'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    verified: {
      type: Boolean,
    },
    password: {
      type: String,
      minlength: 6,
    },
    address: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    centralName: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'customer', 'guest', 'partner'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    timestamps: true,
  }
);

// Hashing Password
UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));

  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparing Password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

// Cascade delete stays when a user is deleted
UserSchema.pre('remove', async function (next) {
  await this.model('Stay').deleteMany({ createdBy: this._id });

  next();
});

// Reverse populate with virtuals
UserSchema.virtual('stays', {
  ref: 'Stay',
  localField: '_id',
  foreignField: 'createdBy',
  justOne: false,
});

// Reverse populate with virtuals
UserSchema.virtual('rooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'createdBy',
  justOne: false,
});

module.exports = mongoose.model('User', UserSchema);
