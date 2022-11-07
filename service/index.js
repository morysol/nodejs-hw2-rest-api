const Contact = require("./schema/contacts");

const getAllcontacts = async () => {
  return await Contact.find();
};

const getContactsById = async (id) => {
  return await Contact.find({ _id: id });
};

const addOneContact = async (contact) => {
  const addedContact = new Contact(contact);
  return await addedContact.save();
};

const removeOneContact = async (id) => {
  return await Contact.deleteOne({ _id: id });
};

const updateOneContact = async (id, contact) => {
  const findContact = Contact.find({ _id: id });
  return await findContact.updateOne({ _id: id }, contact);
};

const updateStatusContact = async (id, favorite) => {
  return await Contact.find(
    { _id: id },
    { $set: { favorite: favorite || false } }
  );
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
