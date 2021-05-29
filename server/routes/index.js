var express = require('express');
var router = express.Router();
const services = require("../services/render");
const mysql = require("mysql");
const sha256 = require("sha256");
const db = mysql.createConnection({
  host : "localhost",
    user : "root",
    password : "root",
    database : "schoolmate"
})
db.connect();

const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', services.homeRoutes);

router.get('/register', services.registerRoutes);

/* register api */
router.post("/register", function(req, res) {
    const id = req.body.id || '';
    const password = req.body.password || '';
    const name = req.body.name || '';
    const age = req.body.age || '';

    if(id.length == 0 || password.length == 0 || name.length == 0 || age.length == 0) {
      return res.status(400).json({err: 'Incorrect info'});
    }

    var sql = `INSERT INTO users (id, name, password, age) VALUES("${id}", "${name}", "${sha256(password)}", ${parseInt(age)})`;
    db.query(sql, function(err, rows, fields) {
      if(err) {
        console.log(err);
        return res.status(400).json({'register': false});
      } else {
        return res.status(201).json({'register': true});
      }
    })
});

router.post("/login", function (req, res) {
  const sql = `SELECT password FROM users WHERE id = "${req.body.id}"`;
  db.query(sql, (err, rows) => {
      if (err)
          return res.status(400).json({
              result: "sql error"
          });
      else {
          try {
              if (rows.pw === sha256(req.body.pw)) {
                  let token = jwt.sign({ name: req.body.id }, "ang");
                  return res.status(200).json({
                      login: true,
                      token: token
                  })
              }
              else {
                  return res.status(404).json({
                      result: "invalid id"
                  })
              }
          }
          catch (e) {
              console.log(e)
              return res.status(400).json({
                  login: false
              })
          }
      }
  });
});

router.get("/login", function (req, res) {
  try {
      return res.status(200).json({
          user: jwt.verify(req.headers.authorization.split(' ')[1], "ang")["name"]
      });
  }
  catch(e) {
      return res.status(401).json({
          login: false
      })
  }
});



module.exports = router;
