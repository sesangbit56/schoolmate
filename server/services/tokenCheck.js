const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

exports.setStatus = function (sessionId) {
  return new Promise((resolve) => {
    if (!sessionId) {
      resolve(false);
    } else {
      try {
        var decodedToken = jwt.verify(sessionId, "ang")["uid"];
        db.query(
          `select name from users where uid = ${decodedToken}`,
          (err, rows) => {
            if (err || !rows.length) {
              resolve(false);
            } else {
              resolve(true);
            }
          }
        );
      } catch (e) {
        resolve(false);
      }
    }
  });
};

exports.setName = function (sessionId) {
  return new Promise((resolve) => {
    if (!sessionId) {
      resolve("");
    } else {
      try {
        var decodedToken = jwt.verify(sessionId, "ang")["uid"];
        db.query(
          `select name from users where uid = ${decodedToken}`,
          (err, rows) => {
            if (err || !rows.length) {
              resolve("");
            } else {
              resolve(rows[0].name);
            }
          }
        );
      } catch (e) {
        resolve("");
      }
    }
  });
};
