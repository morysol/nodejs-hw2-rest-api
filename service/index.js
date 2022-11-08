const Contact = require("./schema/contacts");

const getAllcontacts = async () => {
  const allContacts = await Contact.find();
  return allContacts || null;
};

const getContactsById = async (id) => {
  const oneContact = await Contact.findById(id);
  return oneContact || null;
};

const addOneContact = async (contact) => {
  const addedContact = await Contact.create(contact);
  return addedContact || null;
};

const removeOneContact = async (id) => {
  const removedContact = await Contact.deleteOne({ _id: id });
  if (removedContact.deletedCount === 0) {
    return null;
  }
  return removedContact;
};

const updateOneContact = async (id, contact) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
  return updatedContact || null;
};

const updateStatusContact = async (id, { favorite }) => {
  const updatedStatus = await Contact.findByIdAndUpdate(
    id,
    {
      $set: { favorite },
    },
    { new: true }
  );
  return updatedStatus || null;
};

module.exports = {
  getAllcontacts,
  getContactsById,
  addOneContact,
  removeOneContact,
  updateOneContact,
  updateStatusContact,
};
