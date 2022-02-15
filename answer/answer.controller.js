const Answer = require("./answer.model.js");

const ModelName = Answer;

// Create and Save a new answer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a answer
  const answer = new ModelName({
    title: req.body.title,
    image: req.file.filename,
    question_id: req.body.question_id,
    is_answer: req.body.is_answer
  });

  // Save answer in the database
  ModelName.create(answer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the answer."
      });
    else res.send(data);
  });
};

// Retrieve all answers from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving answers."
      });
    else res.send(data);
  });
};

// Find a single answer with a answerId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.answerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found answer with id ${req.params.answerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving answer with id " + req.params.answerId
        });
      }
    } else res.send(data);
  });
};

// Find a multiple answesr with a questionId
exports.findByQuestionId = (req, res) => {
  ModelName.findByQuestionId(req.params.questionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found answer with id ${req.params.questionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving answer with id " + req.params.questionId
        });
      }
    } else res.send(data);
  });
};

// Update a answer identified by the answerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.answerId,
    new ModelName({
      title: req.body.title,
      image: req.file.filename,
      question_id: req.body.question_id,
      is_answer: req.body.is_answer
    }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found answer with id ${req.params.answerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating answer with id " + req.params.answerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a answer with the specified answerId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.answerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found answer with id ${req.params.answerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete answer with id " + req.params.answerId
        });
      }
    } else res.send({
      message: `answer was deleted successfully!`
    });
  });
};
