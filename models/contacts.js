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

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const allContactsList = await listContacts();
  allContactsList.push(body);
  await saveContacts(allContactsList);
  return body;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
