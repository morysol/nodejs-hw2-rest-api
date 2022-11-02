const Contact = require("./schema/contacts");

const getAllcontacts = async () => {
  return Contact.find();
};

const getContactsById = async (id) => {
  return Contact.find({ _id: id });
};

const addOneContact = async (contact) => {
  const addedContact = new Contact(contact);
  return addedContact.save();
};

const removeOneContact = async (id) => {
  return Contact.deleteOne({ _id: id });
};

const updateOneContact = async (id, contact) => {
  const findContact = Contact.find({ _id: id });
  return findContact.updateOne({ _id: id }, contact);
};

const updateStatusContact = async (id, favorite) => {
  return Contact.find({ _id: id }, { $set: { favorite: favorite || false } });
  //
};

module.exports = {
  getAllcontacts,
  getContactsById,
  addOneContact,
  removeOneContact,
  updateOneContact,
  updateStatusContact,
};
