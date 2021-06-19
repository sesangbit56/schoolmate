const express = require("express");
const router = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");

/* GET home page. */
router.get("/", services.homeRoutes);

router.get("/sign", services.signRoutes);

router.get("/qna", services.qnaRoutes);

router.get("/qna/detail/:pid", services.qnaDetailRoutes);

router.get("/qna/newPost", services.newPostRoutes);

router.get("/mypage", services.myPageRoutes);

router.get("/planner", services.plannerPageRoutes);

/* register api */
router.post("/register", controller.registerControll);

router.post("/login", controller.loginPostControll);

router.get("/user", controller.userGetControll);

router.get("/logout", controller.logoutControll);

router.post("/qna/question", controller.questionPostControll);

router.get("/qna/list", controller.qnaListGetControll);

router.post("/qna/detail/api", controller.questionGetControll);

router.post("/qna/detail/answer", controller.answerPostControll);

router.delete("/qna/detail/:pid", controller.questionDeleteControll);

router.put("/qna/detail/:pid", controller.questionPutControll);

router.get("/qna/detail/answer/:pid", controller.answerGetControll);

router.post("/qna/detail/answer/:aid/rate", controller.ratePostControll);

router.get("/qna/detail/answer/:aid/rate", controller.rateGetControll);

module.exports = router;
