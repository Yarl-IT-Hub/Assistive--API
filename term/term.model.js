const sql = require("../_helpers/db.js");
const tableName = "terms";

// constructor
const Term = function(term) {
  this.levels = term.levels;
  this.description = term.description;
  this.title = term.title;
  this.image = term.image;
  this.sign = term.sign;
  //this.subject_id = term.subject_id;
  this.grade_id = term.grade_id;
};

const ModelName = Term;

ModelName.create = (newTerm, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, newTerm, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created term: ", { id: res.insertId, ...newTerm });
    result(null, { id: res.insertId, ...newTerm });
  });
};

ModelName.findById = (termId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE id = ${termId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found term: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found term with the id
    result({ kind: "not_found" }, null);
  });
};


ModelName.findByGradeId = (gradeId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE grade_id = ${gradeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found term: ", res);
      result(null, res);
      return;
    }

    // not found term with the id
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

    console.log("terms: ", res);
    result(null, res);
  });
};

ModelName.updateById = (id, term, result) => {
  sql.query(
    `UPDATE ${tableName} SET levels = ?, description = ?, title = ?, image = ?, sign = ?, grade_id = ? WHERE id = ?`,
    [term.levels, term.description, term.title, term.image, term.sign, term.grade_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found term with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated term: ", { id: id, ...term });
      result(null, { id: id, ...term });
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
      // not found term with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted term with id: ", id);
    result(null, res);
  });
};



module.exports = ModelName;