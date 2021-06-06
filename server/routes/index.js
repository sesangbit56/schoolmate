const express = require("express");
const router = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");

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
