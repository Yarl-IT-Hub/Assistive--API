const Grade = require("./grade.model.js");

const ModelName = Grade;

// Create and Save a new grade
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a grade
  const grade = new ModelName({
    title: req.body.title,
    image: req.file.filename,
    subject_id: req.body.subject_id,
    no_of_levels: req.body.no_of_levels

  });

  // Save grade in the database
  ModelName.create(grade, (err, data) => {
    
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the grade."
      });
    else res.send(data);
  });
};

// Retrieve all grades from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving grades."
      });
    else res.send(data);
  });
};

// Find a single grade with a gradeId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.gradeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found grade with id ${req.params.gradeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving grade with id " + req.params.gradeId
        });
      }
    } else res.send(data);
  });
};

// Find a multi grades with a subjectId
exports.findBySubjectId = (req, res) => {
  ModelName.findBySubjectId(req.params.subject_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          errorMessage : false,
          message: `Not found grade with id ${req.params.subject_id}.`
        });
      } else {
        res.status(500).send({
          errorMessage : false,
          message: "Error retrieving grade with id " + req.params.subject_id
        });
      }
    } else res.send({ errorMessage : true, data});
  });
};

// Update a grade identified by the gradeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.gradeId,
    new ModelName({title :req.body.title, image :req.file.filename,subject_id: req.body.subject_id,no_of_levels: req.body.no_of_levels}),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found grade with id ${req.params.gradeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating grade with id " + req.params.gradeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a grade with the specified gradeId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.gradeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found grade with id ${req.params.gradeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete grade with id " + req.params.gradeId
        });
      }
    } else res.send({ message: `grade was deleted successfully!` });
  });
};
