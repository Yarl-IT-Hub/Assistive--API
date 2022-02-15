const sql = require("../_helpers/db.js");
const tableName = "subjects";

// constructor
const Subject = function(subject) {
  this.title = subject.title;
  this.image = subject.image;
};

const ModelName = Subject;

ModelName.create = (newSubject, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, newSubject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created subject: ", { id: res.insertId, ...newSubject });
    result(null, { id: res.insertId, ...newSubject });
  });
};

ModelName.findById = (subjectId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE id = ${subjectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found subject: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found subject with the id
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

    console.log("subjects: ", res);
    result(null, res);
  });
};

ModelName.updateById = (id, subject, result) => {
  sql.query(
    `UPDATE ${tableName} SET title = ?, image = ? WHERE id = ?`,
    [subject.title, subject.image, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found subject with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated subject: ", { id: id, ...subject });
      result(null, { id: id, ...subject });
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
      // not found subject with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted subject with id: ", id);
    result(null, res);
  });
};



module.exports = ModelName;