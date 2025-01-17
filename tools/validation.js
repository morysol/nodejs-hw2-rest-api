function validate(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    } else {
      next();
    }
  };
}

module.exports = { validate };
