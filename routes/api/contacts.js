const express = require("express");

//
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { validateContact } = require("../../tools/validation");

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
  const { name, email, phone } = req.body;

  const { error } = validateContact({ name, email, phone });
  console.log(error);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const addedContact = await addContact({ name, email, phone });

    res.status(201).json(addedContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  (await removeContact(id))
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const { error } = validateContact(body);

  if (error) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const isUpdated = await updateContact(id, body);
    if (isUpdated) {
      res.status(200).json(isUpdated);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
