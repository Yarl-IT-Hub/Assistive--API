const sql = require("../_helpers/db.js");
const tableName = "grades";

// constructor
const Grade = function(grade) {
  this.title = grade.title;
  this.image = grade.image;
  this.subject_id = grade.subject_id;
  this.no_of_levels = grade.no_of_levels
};

const ModelName = Grade;

ModelName.create = (newGrade, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, newGrade, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created grade: ", { id: res.insertId, ...newGrade });
    result(null, { id: res.insertId, ...newGrade });
  });
};

ModelName.findById = (gradeId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE id = ${gradeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found grade: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found grade with the id
    result({ kind: "not_found" }, null);
  });
};

ModelName.findBySubjectId = (subjectId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE subject_id = ${subjectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found grade: ", res);
      result(null, res);
      return;
    }

    // not found grade with the id
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

    console.log("grades: ", res);
    result(null, res);
  });
};

ModelName.updateById = (id, grade, result) => {
  sql.query(
    `UPDATE ${tableName} SET title = ?, image = ?,subject_id = ?,no_of_levels = ? WHERE id = ?`,
    [grade.title, grade.image,grade.subject_id,grade.no_of_levels, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found grade with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated grade: ", { id: id, ...grade });
      result(null, { id: id, ...grade });
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
      // not found grade with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted grade with id: ", id);
    result(null, res);
  });
};



module.exports = ModelName;