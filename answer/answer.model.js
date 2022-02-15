const sql = require("../_helpers/db.js");
const tableName = "answers";

// constructor
const Answer = function(answer) {
  this.title = answer.title;
  this.image = answer.image;
  this.question_id = answer.question_id;
  this.is_answer = answer.is_answer;
};

const ModelName = Answer;

ModelName.create = (newAnswer, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, newAnswer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created answer: ", { id: res.insertId, ...newAnswer });
    result(null, { id: res.insertId, ...newAnswer });
  });
};

ModelName.findById = (answerId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE id = ${answerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found answer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found answer with the id
    result({ kind: "not_found" }, null);
  });
};

ModelName.findByQuestionId = (questionId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE question_id = ${questionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found answer: ", res);
      result(null, res);
      return;
    }

    // not found answer with the id
    result({ kind: "not_found" }, null);
  });
};

ModelName.getAll = result => {
  sql.query(`SELECT * FROM ${tableName}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("answers: ", res);
    result(null, res);
  });
};

ModelName.updateById = (id, answer, result) => {
  sql.query(
    `UPDATE ${tableName} SET title = ?, 	image = ?, question_id = ?,is_answer = ? WHERE id = ?`,
    [answer.title, answer.image, answer.question_id,answer.is_answer, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found answer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated answer: ", { id: id, ...answer });
      result(null, { id: id, ...answer });
    }
  );
};

ModelName.remove = (id, result) => {
  sql.query(`DELETE FROM ${tableName} WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found answer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted answer with id: ", id);
    result(null, res);
  });
};



module.exports = ModelName;