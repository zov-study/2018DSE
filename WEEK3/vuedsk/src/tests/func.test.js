var assert = require('assert');
const customer = require("../database/crud");

// Test function call findById() with various parameters
describe('Test function call Customer.findById()', () => {
    it('should return error message or Customer object', ()=>{
      let customersIds=['','5b0f8214ea33042a24beb4b4','upuigpdfiuagpui ouiguig','4484 7648764 95959'];
      customersIds.forEach(customerId => {
        return customer.findById(customerId)
            .then((result)=> {
              assert.equal(result._id, customerId);
          })
          .catch((err)=>{
            assert.equal(err.type, 'error_msg');
          }); 
      });
    });
});
