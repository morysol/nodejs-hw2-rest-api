const { Conflict, Unauthorized, NotFound, BadRequest } = require("http-errors");
const service = require("../../service/apiUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
//
const { sendRegisterEmail } = require("../../tools/nodemailer");

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

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await service.findUser({ verificationToken });
    if (!user) {
      throw new NotFound({
        ResponseBody: {
          message: "User not found",
        },
      });
    }
    if (user && !user.verify) {
      await service.verifyUserEmail(user);
      return res.status(200).json({
        ResponseBody: {
          message: "Verification successful",
        },
      });
    }
    if (user.verify) {
      return res.status(200).json({
        ResponseBody: {
          message: "Already verified",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const verifyAgain = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.findUser({ email });
    if (!user) {
      throw new NotFound({
        ResponseBody: {
          message: "User not found",
        },
      });
    }
    if (user && !user.verify) {
      const { verificationToken } = user;

      await sendRegisterEmail({ email, verificationToken });
      return res.status(200).json({
        ResponseBody: {
          message: "Verification email sent",
        },
      });
    }
    if (user.verify) {
      throw new BadRequest({
        ResponseBody: {
          message: "Verification has already been passed",
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const verificationToken = uuidv4();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await service.findUser({ email });
    if (user) {
      throw new Conflict({ status: 409, message: "Email in use" });
    }
    const result = await service.createUser({
      email,
      password: hashedPassword,
      avatarURL: gravatar.url(email, {
        protocol: "https",
        s: "100",
      }),
      verificationToken,
    });
    const { subscription } = result;
    //
    await sendRegisterEmail({ email, verificationToken });
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

    if (!user.verify) {
      throw new Unauthorized({ message: "Authorization required" });
    }

    const isPassOk = await bcrypt.compare(password, user.password);
    if (!isPassOk) {
      throw new Unauthorized({ message: errMess });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

    const result = await service.updateToken(user._id, token);

    res.status(200).json({
      token: result.token,
      user: { email: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const patchAvatar = async (req, res, next) => {
  const { email } = req.user;
  const rootDir = path.dirname(process.argv[1]);
  const publicDir = "public/avatars";
  const { path: sourceImage, originalname } = req.file;
  const destinationImage = path.join(
    rootDir,
    publicDir,
    `${email}_${originalname}`
  );

  try {
    Jimp.read(sourceImage)
      .then((image) => {
        return image.resize(250, 250).write(destinationImage);
      })
      .catch((error) => {
        next(error);
      });
    await fs.unlink(sourceImage);

    const { avatarURL } = await service.updateAvatar(email, destinationImage);

    return res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrent,
  logout,
  register,
  login,
  patchAvatar,
  verifyEmail,
  verifyAgain,
};
