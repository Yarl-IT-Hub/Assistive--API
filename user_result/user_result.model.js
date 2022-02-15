const sql = require("../_helpers/db.js");
const tableName = "user_results";

// constructor
const User_results = function(user_result) {
  this.user_id = user_result.user_id;
  this.grade_id = user_result.grade_id;
  this.result = user_result.result;
  this.level  = user_result.level;
};

const ModelName = User_results;

ModelName.create = (user_result, result) => {
  sql.query(`INSERT INTO ${tableName} SET ?`, user_result, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user_result: ", { id: res.insertId, ...user_result });
    result(null, { id: res.insertId, ...user_result });
  });
};

ModelName.findById = (user_resultId, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE id = ${user_resultId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user_result: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user_result with the id
    result({ kind: "not_found" }, null);
  });
};

ModelName.findByUserId = (user, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE user_id = ${user.user_id} and grade_id =${user.grade_id} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user_result: ", res[0]);
      result(null, res);
      return;
    }

    // not found user_result with the id
    result({ kind: "not_found" }, null);
  });
};

ModelName.findByUserIdGradeIdLevelId = (user, result) => {
  sql.query(`SELECT * FROM ${tableName} WHERE user_id = ${user.user_id} and grade_id =${user.grade_id} and level = ${user.level}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user_result: ", res[0]);
      result(null, res);
      return;
    }

    // not found user_result with the id
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

    console.log("user_results: ", res);
    result(null, res);
  });
};

ModelName.updateById = (id, user_result, result) => {
  sql.query(
    `UPDATE ${tableName} SET user_id = ?, grade_id = ?, 	result = ?, level = ? WHERE id = ?`,
    [user_result.user_id, user_result.grade_id, user_result.result,user_result.level, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user_result with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user_result: ", { id: id, ...user_result });
      result(null, { id: id, ...user_result });
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
      // not found user_result with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user_result with id: ", id);
    result(null, res);
  });
};



module.exports = ModelName;