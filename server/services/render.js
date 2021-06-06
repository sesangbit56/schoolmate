const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

exports.homeRoutes = (req, res) => {
  console.log("homeRoutes----------------------------------------------------");
  console.log("   SessionId checking...");
  if (!req.cookies.sessionId) {
    console.log("   !!!!SessionId is empty!!!!");
    res.render("index");
  } else {
    try {
      var decodedToken = jwt.verify(req.cookies.sessionId, "ang")["uid"];
    } catch (err) {
      //when sessionId is not valid
      console.log(err);
      res.clearCookie("sessionId");
      res.render("index");
    }
    console.log(decodedToken);
    const query = `select * from users where uid = ${decodedToken}`;

    db.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.clearCookie("sessionId");
        res.render("index");
      } else {
        if (!rows.length) {
          console.log("   !!!!SessionId is Invalid!!!!");
          res.clearCookie("sessionId");
          res.render("index");
        } else {
          console.log("   SessionId Confirmed!");
          res.render("index", {
            status: true,
            name: rows[0].name,
          });
        }
      }
    });
  }
};

exports.signRoutes = (req, res) => {
  res.render("sign");
};
