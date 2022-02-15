const Question = require("./question.model.js");
const Answer = require("../answer/answer.model.js");
const { valid } = require("joi");

const ModelName = Question;
const AnswerModelName = Answer;

// Create and Save a new question
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a question
  const question = new ModelName({
    title: req.body.title,
    level: req.body.level,
    image: req.file.filename,
    type_id: req.body.type_id,
    term_id: req.body.term_id,
    hardness: req.body.hardness
  });

  // Save question in the database
  ModelName.create(question, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the question."
      });
    else res.send(data);
  });
};

// Retrieve all questions from the database.
exports.findAll = (req, res) => {
  ModelName.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving questions."
      });
    else res.send(data);
  });
};

// Find a single question with a questionId
exports.findOne = (req, res) => {
  ModelName.findById(req.params.questionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found question with id ${req.params.questionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving question with id " + req.params.questionId
        });
      }
    } else res.send(data);
  });
};

// Find a multi question with a gradeId
exports.findByGradeId = (req, res) => {
  ModelName.findByGradeId({"id":req.params.gradeId,"level":req.params.level}, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          errorMessage : false,
          message: `Not found question with id ${req.params.gradeId}.`
        });
      } else {
        res.status(500).send({
          errorMessage : false,
          message: "Error retrieving question with id " + req.params.gradeId
        });
      }
    } 
    else res.send({errorMessage : true, data});
    
    
  });
};

// Update a question identified by the questionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ModelName.updateById(
    req.params.questionId,
    new ModelName({
      title: req.body.title,
      level: req.body.level,
      image: req.file.filename,
      type_id: req.body.type_id,
      term_id: req.body.term_id,
      hardness: req.body.hardness
    }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found question with id ${req.params.questionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating question with id " + req.params.questionId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a question with the specified questionId in the request
exports.delete = (req, res) => {
  ModelName.remove(req.params.questionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found question with id ${req.params.questionId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete question with id " + req.params.questionId
        });
      }
    } else res.send({
      message: `question was deleted successfully!`
    });
  });
};
