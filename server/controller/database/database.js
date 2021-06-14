const mysql = require("mysql");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

exports.sendQuery = (query) => {
  return new Promise((resolve) => {
    db.query(query, (err, rows, fields) => {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
