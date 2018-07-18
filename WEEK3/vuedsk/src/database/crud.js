const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('vuedsk.json');
const db = low(adapter);

// Set some defaults if your JSON file is empty
db.defaults({ contacts: [], districts: [], months: [] })
  .write();

// Find a contact by Phone
exports.findByPhone=(phone)=>{
    let contact = db.get('contacts')
    .filter({phone:phone})
    .value();
    return contact;
};

// Add a contact
exports.newRecords = (table,record)=>{
    console.log(db.get(table)
    .push(record)
    .write());
};

// Set a user using Lodash powerful shorthand syntax
exports.newUser = (user)=>{
    db.get('users')
    .push(user)
  .write();
};

// Get data from table
exports.getTable = (table)=>{
    let tab = db.get(table)
    .value();
    return tab;
};
