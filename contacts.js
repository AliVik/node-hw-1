const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// const contactsOperations = async (action, path, data) => {
//   switch (action) {
//     case "getAllContacts":
//       console.log(contacts);
//       break;
//     case "addContact":
//       await fs.appendFile();
//   }
// };

const listContacts = async () => {
  const contactsString = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactsString);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact ? foundContact : null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const upgradedContacts = contacts.filter((contact) => {
    return contact.id !== contactId;
  });
  console.log("upgradedContacts", JSON.stringify(upgradedContacts));
  //   return await fs.writeFile(contactsPath, JSON.stringify(upgradedContacts));
};

removeContact("1");
