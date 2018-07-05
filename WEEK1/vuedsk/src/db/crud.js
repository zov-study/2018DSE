const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('vuedsk.json');
const db = low(adapter);

// Set some defaults if your JSON file is empty
db.defaults({ customers: [], users: {} })
  .write();

// Find a customer by Phone
exports.findByPhone=(phone)=>{
    let customer = db.get('customers')
    .filter({phone:phone})
    .value();
    return customer;
};

// Add a customer
exports.newCustomer =(customer)=>{
    console.log(db.get('customers')
    .push(customer)
    .write());
};

// Set a user using Lodash powerful shorthand syntax
exports.newUser = (user)=>{
    db.get('users')
    .push(user)
  .write();
};