var express = require('express');
var router = express.Router();
const services = require("../services/render");
const mysql = require("mysql");
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

router.post("/register", function(req, res) {
  console.log('ASDF')
    const id = req.body.id || '';
    const password = req.body.password || '';
    const name = req.body.name || '';
    const age = parseInt(req.body.age);

    console.log(req.body);
    console.log(password);

    if(!id.length || !password.length || !name.length || !age.length) {
      return res.status(400).json({err: 'Incorrect info'});
    }

    var sql = `INSERT INTO users(id, name, password, age) VALUES(${id, name, password, age})`;
    db.query(sql, function(err, rows, fields) {
      if(err) {
        return res.status(400).json({err: "Sonething went wrong"});
      } else {
        return res.status(201).json({"auto_Increment" : rows.insertId});
      }
    })
});



module.exports = router;
