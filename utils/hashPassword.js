const bcrypt = require('bcryptjs');

const hashPassword = (Schema) => {
  // Hashing Password
  Schema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));

    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
};

module.exports = hashPassword;

// // Comparing Password
// UserSchema.methods.comparePassword = async function (enteredPassword) {
//   const isMatch = await bcrypt.compare(enteredPassword, this.password);
//   return isMatch;
// };
