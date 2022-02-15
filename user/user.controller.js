const User = require("./user.model.js");

const ModelName = User;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user
  const user = new ModelName({
    name: req.body.name,
    last_name: req.body.last_name,
    mac: req.body.mac
  });

  // Save user in the database
  ModelName.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Find a single user with last name & name
exports.getUserByFirstNameLastName = (req, res) => {
  ModelName.getUserByFirstNameLastName({"last_name":req.body.last_name,"name":req.body.name}, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        // res.status(404).send({
        //   errorMessage: false,
        //   message: `Not found user with phone new ${req.params.phone}.`
        // });

          // Create a user
        const user = new ModelName({
          name: req.body.name,
          last_name: req.body.last_name,
          mac: req.body.mac
        });

        // Save user in the database
        ModelName.create(user, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
          else res.status(200).send({errorMessage: true, data});
        });

      } else {
        res.status(500).send({
          message: "Error retrieving user with phone " + req.body.last_name
        });
      }
    } else{
      res.send({errorMessage: true, data});
    }
  });
};

// search user with name
exports.searchByName = (req, res) => {
  ModelName.searchByName(req.params.userName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with name ${req.params.userName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with name " + req.params.userName
        });
      }
    } else res.send(data);
  });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.userId,
    new ModelName(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};
