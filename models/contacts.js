const fs = require("fs/promises");

const listContacts = async () => {
  try {
    const allContactsList = await fs.readFile("models/contacts.json", "utf8");
    return JSON.parse(allContactsList);
  } catch (error) {
    return error;
  }
};

const saveContacts = async (contacts) => {
  try {
    await fs.writeFile(
      "models/contacts.json",
      JSON.stringify(contacts),
      "utf8"
    );
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  const allContactsList = await listContacts();

  const contact = allContactsList.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const allContactsList = await listContacts();
  const idx = allContactsList.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return false;
  } else {
    allContactsList.splice(idx, 1);
    await saveContacts(allContactsList);
    return true;
  }
};

const addContact = async (body) => {
  const allContactsList = await listContacts();
  allContactsList.push(body);
  await saveContacts(allContactsList);
  return body;
};

const updateContact = async (contactId, body) => {
  const allContactsList = await listContacts();
  const idx = allContactsList.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return false;
  } else {
    const newContact = { ...allContactsList[idx], ...body };
    allContactsList.splice(idx, 1, newContact);
    await saveContacts(allContactsList);
    return newContact;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
