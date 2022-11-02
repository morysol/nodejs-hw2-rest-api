function validateContact(schema) {
  return function (req, res, next) {
    const { name, phone, email, favorite } = req.body;
    const { error } = schema.validate({ name, phone, email, favorite });
    if (error) {
      error.status = 400;
      next(error);
    } else {
      next();
    }
  };
}

function validateStatus(schema) {
  return function (req, res, next) {
    const { favorite } = req.body;
    const { error } = schema.validate({ favorite });
    if (error) {
      error.status = 400;
      next(error);
    } else {
      next();
    }
  };
}

module.exports = { validateContact, validateStatus };
