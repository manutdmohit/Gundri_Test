const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
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
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
    mobile: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'Please provide phone number'],
    },
    country: {
      type: 'String',
      required: [true, 'Please provide country name'],
    },
  },
  {
    timestamps: true,
  }
);

// // Hashing Password
// UserSchema.pre('save', async function () {
//   // console.log(this.modifiedPaths());
//   // console.log(this.isModified('name'));

//   if (!this.isModified('password')) return;

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model('Admin', AdminSchema);
