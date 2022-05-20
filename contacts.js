const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const contactsString = await fs.readFile(contactsPath);
  return JSON.parse(contactsString);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact ? foundContact : null;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    name,
    phone,
    email,
    id: nanoid(),
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find((contact) => contact.id === contactId);
  const updatedContacts = contacts.filter((contact) => {
    return contact.id !== contactId;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  console.log(contactToRemove);
  return contactToRemove;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
