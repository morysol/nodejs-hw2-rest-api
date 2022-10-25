const express = require("express");
const { v4: uuidv4 } = require("uuid");
//
const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contacts");

const router = express.Router();

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

router.post("/", async (req, res, next) => {
  const newContact = req.query;
  const isFieldMissing =
    newContact.name && newContact.email && newContact.phone;

  if (!isFieldMissing) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const { name, email, phone } = newContact;
    const addedContact = await addContact({ id: uuidv4(), name, email, phone });

    res.status(201).json(addedContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
