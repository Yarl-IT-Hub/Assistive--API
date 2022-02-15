module.exports = app => {
    const user_result = require("./user_result.controller.js");
    const authorize = require('_middleware/authorize');

    const subUrl = "user_results";

    // Create a new user_result
    app.post(`/${subUrl}`, user_result.create);
  
    // Retrieve all user_result
    app.get(`/${subUrl}`, user_result.findAll);
  
    // Retrieve a single user_result with user_resultId
    app.get(`/${subUrl}/:user_resultId`, user_result.findOne);

    // Retrieve a single user_result with user_resultId
    app.get(`/${subUrl}/findByUserId/:user_id/:grade_id`, user_result.findByUserId);
  
    // Update a user_result with user_resultId
    app.put(`/${subUrl}/:user_resultId`, user_result.update);
  
    // Delete a user_result with user_resultId
    app.delete(`/${subUrl}/:user_resultId`, user_result.delete);
  
  };