const querystring = require("querystring");
const url = require("url");

const tokenCheck = require("./tokenCheck");
const questionCheck = require("./questionCheck");

exports.homeRoutes = async (req, res) => {
  console.log("homeRoutes----------------------------------------------------");

  const status = await tokenCheck.setStatus(req.cookies.sessionId);
  const name = await tokenCheck.setName(req.cookies.sessionId);
  const questions = await questionCheck.getRecommendedQuestions();

  res.render("index", {
    status: status,
    name: name,
    questions: questions,
  });
};

exports.signRoutes = (req, res) => {
  res.render("sign");
};

exports.qnaRoutes = async (req, res) => {
  console.log("qnaRoutes----------------------------------------------------");

  const parsedUrl = url.parse(req.url);
  const page = querystring.parse(parsedUrl.query, "&", "=").list;

  const status = await tokenCheck.setStatus(req.cookies.sessionId);
  const name = await tokenCheck.setName(req.cookies.sessionId);
  const qnaList = await questionCheck.getQnaList(page);

  res.render("qna", {
    status: status,
    name: name,
    qnaList: qnaList,
  });
};

exports.newPostRoutes = async (req, res) => {
  console.log(
    "newPostRoutes----------------------------------------------------"
  );

  const status = await tokenCheck.setStatus(req.cookies.sessionId);
  const name = await tokenCheck.setName(req.cookies.sessionId);

  res.render("newpost", {
    status: status,
    name: name,
  });
};
