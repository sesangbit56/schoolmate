const mysql = require("mysql");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

exports.searchQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
};

exports.changeQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, rows) => {
      err ? reject(err) : resolve();
    });
  });
};
