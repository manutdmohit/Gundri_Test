const createTokenUser = (user) => {
  if (user.role === 'guest') {
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
  }
  if (user.role === 'partner') {
    return {
      centralName: user.centralName,
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
