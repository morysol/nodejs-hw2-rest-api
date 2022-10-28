const schema = require("./schema");

function validateContact(req, res, next) {
  const { error } = schema.validate(req.body);

  if (error) {
    next(res.status(400).json({ message: "missing fields" }));
  } else {
    next();
  }
}

module.exports = validateContact;
