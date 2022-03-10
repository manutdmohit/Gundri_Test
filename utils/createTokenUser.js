const createTokenUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userId: user._id,
    country: user.country,
    mobileNumber: user.mobileNumber,
    address1: user.address1,
    address2: user.address2,
  };
};

module.exports = createTokenUser;
