const { Unauthorized } = require("http-errors");
const service = require("../../service/apiUsers");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await service.updateToken(_id, null);
    if (!result) {
      throw new Unauthorized("Not authorized");
    }
    res.status(204).json("No Content");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrent,
  logout,
};
