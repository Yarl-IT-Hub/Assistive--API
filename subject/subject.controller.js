const Subject = require("./subject.model.js");
const multer = require("multer");
const path = require("path");

const ModelName = Subject;


// Create and Save a new subject
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a subject
  const subject = new ModelName({
    title: req.body.title,
    image: req.file.filename
  });

  // Save subject in the database
  ModelName.create(subject, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the subject."
      });
    else res.send(data);
  });
};

// Retrieve all subjects from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subjects."
      });
    else res.send(data);
  });
};

// Find a single subject with a subjectId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.subjectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found subject with id ${req.params.subjectId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving subject with id " + req.params.subjectId
        });
      }
    } else res.send(data);
  });
};

// Update a subject identified by the subjectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.subjectId,
    new ModelName({title :req.body.title, image :req.file.filename}),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found subject with id ${req.params.subjectId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating subject with id " + req.params.subjectId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a subject with the specified subjectId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.subjectId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found subject with id ${req.params.subjectId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete subject with id " + req.params.subjectId
        });
      }
    } else res.send({ message: `subject was deleted successfully!` });
  });
};
