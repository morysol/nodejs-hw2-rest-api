const User = require("./schema/users");

const findUser = async (email) => {
  const foundUser = await User.findOne(email);
  return foundUser || null;
};

const createUser = async (user) => {
  const createdUser = await User.create(user);
  return createdUser || null;
};

const updateToken = async (id, token) => {
  const updatedStatus = await User.findByIdAndUpdate(
    id,
    {
      $set: { token },
    },
    { new: true }
  );
  return updatedStatus || null;
};

const updateAvatar = async (email, avatarURL) => {
  const updated = await User.findOneAndUpdate(
    { email },
    { $set: { avatarURL: avatarURL } },
    { new: true }
  );

  return updated;
};

module.exports = {
  findUser,
  createUser,
  updateToken,
  updateAvatar,
};
