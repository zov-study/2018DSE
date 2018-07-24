const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('mycontacts.db.json');
const db = low(adapter);

// Set default tables if your database file is empty
db.defaults({ contacts:[], districts:[], months:[], stypes:[]})
  .write();

  // Find in a Table by Field & Value
exports.findByVal=(table, field,value)=>{
    return db.get(table)
    .find((v)=>{return _.lowerCase(v[_.lowerCase(field)])==_.lowerCase(value);})
    .value();
};

// Add a new Record into Table
exports.newRecord = (table,record)=>{
    return db.get(table)
    .push(record)
    .write();
};

// Add a update Record into Table
exports.updateRecord = (table,id,record)=>{
    return db.get(table)
    .find({ id: id })
    .assign(record)
    .write();
};

// Add a remove Record into Table
exports.removeRecord = (table,id)=>{
    return db.get(table)
    .remove({ id: id })
    .write();
};

// Get data from table
exports.getTable = (table)=>{
    return db.get(table)
    .value();
};

