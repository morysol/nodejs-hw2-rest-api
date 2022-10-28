const Joi = require("joi");

const schema = Joi.object({
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
});

function validateContact(req, res, next) {
  const { error } = schema.validate(req.body);

  if (error) {
    next(res.status(400).json({ message: "missing fields" }));
  } else {
    next();
  }
}

module.exports = validateContact;
