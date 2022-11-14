const { Conflict, Unauthorized } = require("http-errors");
const service = require("../../service/apiUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await service.findUser({ email });
    if (user) {
      throw new Conflict({ status: 409, message: "Email in use" });
    }
    const result = await service.createUser({
      email,
      password: hashedPassword,
    });
    const { subscription } = result;
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errMess = "Email or password is wrong";
    const { email, password } = req.body;

    const user = await service.findUser({ email });
    if (!user) {
      throw new Unauthorized({ message: errMess });
    }

    const isPassOk = await bcrypt.compare(password, user.password);
    if (!isPassOk) {
      throw new Unauthorized({ message: errMess });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const result = await service.updateToken(user._id, token);

    res.status(200).json({
      token: result.token,
      user: { email: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrent,
  logout,
  register,
  login,
};
