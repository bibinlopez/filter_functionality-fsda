const User = require('../models/userSchema');
const CustomAPIError = require('../errors/custom-error');

const getAllUser = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  return res.status(200).json({ data: users, count: users.length });
};

const getSingleUser = async (req, res) => {
  const { userId: id } = req.body;
  if (!id) {
    console.log('no id provided');
    throw new CustomAPIError('No id Provided', 400);
  }
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new CustomAPIError(`No user found in the id: ${id}`, 404);
  }
  return res.status(200).json({ data: user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select('-password');

  return res.status(200).json({ data: user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ data: user });
};

const updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new CustomAPIError('incorrect Current password', 401);
  }
  user.password = newPassword;
  await user.save();
  return res.status(200).json({ msg: 'Success!!! Password updated.' });
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
