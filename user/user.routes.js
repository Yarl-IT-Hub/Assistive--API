module.exports = app => {
    const user = require("./user.controller.js");
    const authorize = require('_middleware/authorize');

    const subUrl = "users";

    // Create a new user
    app.post(`/${subUrl}`, user.create);
  
    // Retrieve all user
    app.get(`/${subUrl}`, user.findAll);
  
    // Retrieve a single user with userId
    app.get(`/${subUrl}/:userId`, user.findOne);

    // register a single user with phone no
    app.post(`/${subUrl}/register/`, user.getUserByFirstNameLastName);
  
    // Update a user with userId
    app.put(`/${subUrl}/:userId`, user.update);
  
    // Delete a user with userId
    app.delete(`/${subUrl}/:userId`, user.delete);
  
  };