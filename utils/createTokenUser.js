const createTokenUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    userId: user._id,
    mobileNumber: user.mobileNumber,
  };
};

module.exports = createTokenUser;
