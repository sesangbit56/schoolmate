const express = require("express");
const router = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");

/* GET home page. */
router.get("/", services.homeRoutes);

router.get("/sign", services.signRoutes);

/* register api */
router.post("/register", controller.registerControll);

router.post("/login", controller.loginPostControll);

router.get("/user", controller.userGetControll);

router.get("/logout", controller.logoutControll);

router.post("/qna/question", controller.questionPostControll);

router.get("/qna/list", controller.qnaListGetControll);

module.exports = router;
