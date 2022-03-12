exports.showCurrentLoggedInUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
