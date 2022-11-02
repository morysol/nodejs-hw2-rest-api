const service = require("../service");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllcontacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactsById(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const add = async (req, res, next) => {
  try {
    const result = await service.addOneContact(req.body);
    if (result) {
      res.json({
        status: "success",
        code: 201,
        data: { contact: result },
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.removeOneContact(contactId);
    if (result.deletedCount === 1) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.updateOneContact(contactId, req.body);
    if (result.modifiedCount === 1 || result.matchedCount > 0) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  if (!req.body) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
      data: "missing required data",
    });
  }

  try {
    const result = await service.updateOneContact(contactId, req.body);
    if (result.modifiedCount === 1 || result.matchedCount > 0) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { get, getById, add, remove, update, updateFavorite };
