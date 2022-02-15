const Type = require("./type.model.js");

const ModelName = Type;

// Create and Save a new type
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a type
  const type = new ModelName({
    title: req.body.title
  });

  // Save type in the database
  ModelName.create(type, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the type."
      });
    else res.send(data);
  });
};

// Retrieve all types from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving types."
      });
    else res.send(data);
  });
};

// Find a single type with a typeId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.typeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found type with id ${req.params.typeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving type with id " + req.params.typeId
        });
      }
    } else res.send(data);
  });
};

// Update a type identified by the typeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.typeId,
    new ModelName(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found type with id ${req.params.typeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating type with id " + req.params.typeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a type with the specified typeId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.typeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found type with id ${req.params.typeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete type with id " + req.params.typeId
        });
      }
    } else res.send({ message: `type was deleted successfully!` });
  });
};
