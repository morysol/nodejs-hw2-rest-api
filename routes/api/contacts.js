const express = require("express");

//
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const validateContact = require("../../tools/validation");

const router = express.Router();

const middlewareValidateContact = (req, res, next) => {
  validateContact(req, res, next);
};

router.get("/", async (req, res, next) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: `contact with id ${id} not found` });
  }
});

router.post("/", middlewareValidateContact, async (req, res, next) => {
  const addedContact = await addContact(req.body);
  res.status(201).json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (await removeContact(id)) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", middlewareValidateContact, async (req, res, next) => {
  const id = req.params.contactId;

  const isUpdated = await updateContact(id, req.body);
  if (isUpdated) {
    res.status(200).json(isUpdated);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
