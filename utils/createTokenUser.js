const createTokenUser = (user) => {
  if (user.address && user.country) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userId: user._id,
      mobileNumber: user.mobileNumber,
      address: user.address,
      country: user.country,
    };
  } else if (
    user.address1 &&
    user.address2 &&
    user.state &&
    user.city &&
    user.country
  ) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userId: user._id,
      mobileNumber: user.mobileNumber,
      address1: user.address1,
      address2: user.address2,
      state: user.state,
      city: user.city,
      country: user.country,
    };
  } else {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userId: user._id,
      mobileNumber: user.mobileNumber,
    };
  }
};

module.exports = createTokenUser;
