const Joi = require("joi");

const schemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string()
    .replace(/[^0-9]/gi, "")
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemaStatus = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = { schemaContact, schemaStatus };
