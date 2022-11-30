const nodemailer = require("nodemailer");
require("dotenv").config();
const user = process.env.USER_NAME;
const pass = process.env.USER_PASSWORD;

const sendRegisterEmail = async ({
  email = "cepera.cMupHoB@gmail.com",
  verificationToken,
}) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user,
      pass,
    },
  });

  const url = `localhost:3000/api/users/verify/${verificationToken}`;
  const registerEmail = {
    from: "info@user.com",
    to: email,
    subject: "Hellp",
    html: `<h2> press link to register <a href="${url}"> ${url} </a></h2>`,
    text: " test mail",
  };
  const response = await transport.sendMail(registerEmail);
  return response;
};

module.exports = { sendRegisterEmail };
