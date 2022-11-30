const { BadRequest } = require("http-errors");
const emailVerify = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequest({
        ResponseBody: {
          message: "missing required field email",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = emailVerify;
