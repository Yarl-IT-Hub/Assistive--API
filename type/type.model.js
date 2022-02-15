const sql = require("../_helpers/db.js");
const tableName = "types";

// constructor
const Type = function(type) {
  this.title = type.title;
};

const ModelName = Type;

ModelName.create = (newType, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, newType, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created type: ", { id: res.insertId, ...newType });
    result(null, { id: res.insertId, ...newType });
  });
};

ModelName.findById = (typeId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE id = ${typeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found type: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found type with the id
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

    console.log("types: ", res);
    result(null, res);
  });
};

ModelName.updateById = (id, type, result) => {
  sql.query(
    `UPDATE ${tableName} SET title = ? WHERE id = ?`,
    [type.title, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found type with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated type: ", { id: id, ...type });
      result(null, { id: id, ...type });
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
      // not found type with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted type with id: ", id);
    result(null, res);
  });
};



module.exports = ModelName;