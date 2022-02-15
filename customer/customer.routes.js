module.exports = app => {
    const customers = require("./customer.controller.js");
    const authorize = require('_middleware/authorize');

    const subUrl = "customers";

    // Create a new Customer
    app.post(`/${subUrl}`, customers.create);
  
    // Retrieve all Customers
    app.get(`/${subUrl}`, customers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get(`/${subUrl}/:customerId`, customers.findOne);

    // Search Customer with name
    app.get(`/${subUrl}/byname/:customerName`, customers.searchByName);
  
    // Update a Customer with customerId
    app.put(`/${subUrl}/:customerId`, customers.update);
  
    // Delete a Customer with customerId
    app.delete(`/${subUrl}/:customerId`, customers.delete);
  
    // Create a new Customer
    app.delete(`/${subUrl}`, customers.deleteAll);
  };