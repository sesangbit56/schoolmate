var express = require("express");
var router = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const mysql = require("mysql");
const sha256 = require("sha256");
const url = require("url");
const jwt = require("jsonwebtoken");
var querystring = require("querystring");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

const bodyParser = require("body-parser");

/* GET home page. */
router.get("/", services.homeRoutes);

router.get("/sign", services.signRoutes);

router.post("/signIn", (req, res) => {
  // console.log("signIn====================");
  // console.log(req.body);
  req.session.login = req.body.login;
  req.session.name = req.body.name;

  res.redirect("/");
});

/* register api */
router.post("/register", controller.registerControll);

router.post("/login", controller.loginPostControll);

router.get("/login", controller.loginGetControll);

router.get("/user", controller.userGetControll);

router.post("/qna/question", controller.questionPostControll);

router.get("/qna/list", controller.qnaListGetControll);

module.exports = router;
