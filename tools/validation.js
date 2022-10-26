const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

function validateContact(data) {
  return schema.validate(data);
}

function filterContact({ name, email, phone }) {
  let filteredName = name.match(/\w/g);
  filteredName = filteredName ? filteredName.join("") : "";

  let filteredPhone = phone.match(/\d/g);
  filteredPhone = filteredPhone ? filteredPhone.join("") : "";

  return {
    name: filteredName,
    email,
    phone: filteredPhone,
  };
}

module.exports = {
  filterContact,
  validateContact,
};
