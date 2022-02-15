module.exports = app => {
    const type = require("./type.controller.js");
    const authorize = require('_middleware/authorize');

    const subUrl = "types";

    // Create a new type
    app.post(`/${subUrl}`, type.create);
  
    // Retrieve all type
    app.get(`/${subUrl}`, type.findAll);
  
    // Retrieve a single type with typeId
    app.get(`/${subUrl}/:typeId`, type.findOne);
  
    // Update a type with typeId
    app.put(`/${subUrl}/:typeId`, type.update);
  
    // Delete a type with typeId
    app.delete(`/${subUrl}/:typeId`, type.delete);
  
  };