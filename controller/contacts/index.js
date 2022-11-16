const service = require("../../service/apiContacts");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllcontacts();
    if (results) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: results,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Nothing found`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
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
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.removeOneContact(contactId);
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
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.updateOneContact(contactId, req.body);
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
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.updateStatusContact(contactId, req.body);
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
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { get, getById, add, remove, update, updateFavorite };
