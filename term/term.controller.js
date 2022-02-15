const Term = require("./term.model.js");

const ModelName = Term;

// Create and Save a new term
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a term
  const term = new ModelName({
    levels: req.body.levels,
    description: req.body.description,
    title: req.body.title,
    image: req.file.filename,
    sign: req.body.sign,
    //subject_id: req.body.subject_id,
    grade_id: req.body.grade_id
  });

  // Save term in the database
  ModelName.create(term, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the term."
      });
    else res.send(data);
  });
};

// Retrieve all terms from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving terms."
      });
    else res.send(data);
  });
};

// Find a single term with a termId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.termId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found term with id ${req.params.termId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving term with id " + req.params.termId
        });
      }
    } else res.send(data);
  });
};

// Find a multi term with a gradeId
exports.findByGradeId = (req, res) => {
  ModelName.findByGradeId(req.params.gradeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found term with id ${req.params.gradeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving term with id " + req.params.gradeId
        });
      }
    } else res.send(data);
  });
};

// Update a term identified by the termId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.termId,
    // new ModelName(req.body),
    new ModelName({
      levels: req.body.levels,
      description: req.body.description,
      title: req.body.title,
      image: req.file.filename,
      sign: req.body.sign,
      subject_id: req.body.subject_id,
      grade_id: req.body.grade_id
    }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found term with id ${req.params.termId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating term with id " + req.params.termId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a term with the specified termId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.termId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found term with id ${req.params.termId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete term with id " + req.params.termId
        });
      }
    } else res.send({ message: `term was deleted successfully!` });
  });
};
