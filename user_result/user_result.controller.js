const User_results = require("./user_result.model.js");

const ModelName = User_results;

// Create and Save a new user_result
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user_result
  const user_result = new ModelName({
    user_id: req.body.user_id,
    grade_id: req.body.grade_id,
    result: req.body.result,
    level: req.body.level
  });


  ModelName.findByUserIdGradeIdLevelId({"user_id":req.body.user_id,"grade_id":req.body.grade_id,"level":req.body.level}, (err, data) => {
    if (!err) {
      if(data[0].result < req.body.result){
        data[0].result = req.body.result;
        ModelName.updateById(
          data[0].id,
          new ModelName(data[0]),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found user_result with id ${req.params.user_resultId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating user_result with id " + req.params.user_resultId
                });
              }
            } else res.send(data);
          }
        );
      }
      
    }
    else{
      //Save user_result in the database
      ModelName.create(user_result, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user_result."
          });
        else res.send(data);
      });
    } 
  });

  
};

// Retrieve all user_results from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user_results."
      });
    else res.send(data);
  });
};

// Find a single user_result with a user_resultId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.user_resultId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user_result with id ${req.params.user_resultId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user_result with id " + req.params.user_resultId
        });
      }
    } else res.send(data);
  });
};

// Find a single user_result with a user_resultId
exports.findByUserId = (req, res) => {
  ModelName.findByUserId({"user_id":req.params.user_id,"grade_id":req.params.grade_id}, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user_result with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user_result with id " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};



// Update a user_result identified by the user_resultId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.user_resultId,
    new ModelName(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user_result with id ${req.params.user_resultId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user_result with id " + req.params.user_resultId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a user_result with the specified user_resultId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.user_resultId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user_result with id ${req.params.user_resultId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user_result with id " + req.params.user_resultId
        });
      }
    } else res.send({ message: `user_result was deleted successfully!` });
  });
};
