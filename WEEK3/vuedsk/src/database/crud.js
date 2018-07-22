const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('mycontacts.db.json');
const db = low(adapter);

// Set default tables if your database file is empty
db.defaults({ contacts:[], districts:[], months:[], stypes:[]})
  .write();

  // Find in a Table by Field & Value
exports.findByVal=(table, field,value)=>{
    let record = db.get(table)
    .find((v)=>{return _.lowerCase(v[_.lowerCase(field)])==_.lowerCase(value)})
    .value();
    return record;
};

// Add a new Record into Table
exports.newRecord = (table,record)=>{
    console.log(db.get(table)
    .push(record)
    .write());
};

// Get data from table
exports.getTable = (table)=>{
    let tab = db.get(table)
    .value();
    return tab;
};
