const sql = require("../_helpers/db.js");
const tableName = "questions";

// constructor
const Question = function(question) {
  this.title = question.title;
  this.level = question.level;
  this.image = question.image;
  this.type_id = question.type_id;
  this.term_id = question.term_id;
  this.hardness = hardness;
};

const ModelName = Question;

ModelName.create = (newQuestion, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, newQuestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created question: ", { id: res.insertId, ...newQuestion });
    result(null, { id: res.insertId, ...newQuestion });
  });
};

ModelName.findById = (questionId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE id = ${questionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found question: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found question with the id
    result({ kind: "not_found" }, null);
  });
};

ModelName.findByGradeId = (grade, result) => {
  
  sql.query(`SELECT * FROM ${tableName} WHERE level =${grade.level} and term_id in (select id from terms where grade_id = ${grade.id})` , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      // console.log("found question: ", res);
      result(null, res);
      return;
    }

    // not found question with the id
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

    console.log("questions: ", res);
    result(null, res);
  });
};

ModelName.updateById = (id, question, result) => {
  sql.query(
    `UPDATE ${tableName} SET title = ?, level = ?, 	image = ?, type_id = ?, term_id = ?,hardness = ? WHERE id = ?`,
    [question.title, question.level, question.image, question.type_id, question.term_id,question.hardness, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found question with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated question: ", { id: id, ...question });
      result(null, { id: id, ...question });
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
      // not found question with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted question with id: ", id);
    result(null, res);
  });
};

module.exports = ModelName;