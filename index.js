const contactsOperations = require("./contacts");
const { program } = require("commander");

program
  .option("-a,--action <type>", "contacts operations")
  .option("-i,--id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-p, --phone <type>", "contact phone")
  .option("-e, --email <type>", "contact email");

program.parse(process.argv);
const options = program.opts();

const contactsInvoke = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;
    case "getContactById":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`The contact with id ${id} doesn't exist`);
      }
      console.log(contact);
      break;
    case "addContact":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;
    case "removeContact":
      const result = await contactsOperations.removeContact(id);
      if (!result) {
        throw new Error(`The contact with id ${id} doesn't exist`);
      }

      break;
  }
};

contactsInvoke(options);
// contactsInvoke({ action: "listContacts" });
// contactsInvoke({ action: "getContactById", id: "4" });
// contactsInvoke({
//   action: "addContact",
//   name: "Mary Ann",
//   phone: "333-24-35",
//   email: "lalalala@gmail.com",
// });

// contactsInvoke({ action: "removeContact", id: "76" });
