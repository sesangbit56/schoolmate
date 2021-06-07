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

const tokenCheck = require("./tokenCheck");

exports.homeRoutes = (req, res) => {
  console.log("homeRoutes----------------------------------------------------");
  console.log("   SessionId checking...");
  var questions = undefined;
  db.query(
    `select pid, title, writer_id from questions where pid between 30 and 39`,
    (err, rows, fields) => {
      if (err) {
        res.render("index", {
          status: false,
          name: "",
          questions: questions,
        });
      } else {
        questions = JSON.parse(JSON.stringify(rows));
        if (!req.cookies.sessionId) {
          console.log("   !!!!SessionId is empty!!!!");
          res.render("index", {
            status: false,
            name: "",
            questions: questions,
          });
        } else {
          try {
            var decodedToken = jwt.verify(req.cookies.sessionId, "ang")["uid"];
          } catch (err) {
            //when sessionId is not valid
            console.log(err);
            res.clearCookie("sessionId");
            res.render("index", {
              status: false,
              name: "",
              questions: questions,
            });
          }
          console.log(decodedToken);
          const query = `select * from users where uid = ${decodedToken}`;

          db.query(query, (err, rows, fields) => {
            if (err) {
              console.log(err);
              res.clearCookie("sessionId");
              res.render("index", {
                status: false,
                name: "",
                questions: questions,
              });
            } else {
              if (!rows.length) {
                console.log("   !!!!SessionId is Invalid!!!!");
                res.clearCookie("sessionId");
                res.render("index", {
                  status: false,
                  name: "",
                  questions: questions,
                });
              } else {
                console.log("   SessionId Confirmed!");
                res.render("index", {
                  status: true,
                  name: rows[0].name,
                  questions: questions,
                });
              }
            }
          });
        }
      }
    }
  );
};

exports.signRoutes = (req, res) => {
  res.render("sign");
};

exports.qnaRoutes = (req, res) => {
  console.log("qnaRoutes----------------------------------------------------");
  console.log("   SessionId checking...");
<<<<<<< HEAD

  tokenCheck.checkSessionId(req.cookies.sessionId, function (decodedToken) {});
  // if (!req.cookies.sessionId) {
  //   console.log("   !!!!SessionId is empty!!!!");
  //   res.render("qna", {
  //     status: false,
  //     name: "",
  //     qnaList: "",
  //   });
  // } else {
  //   try {
  //     var decodedToken = jwt.verify(req.cookies.sessionId, "ang")["uid"];
  //   } catch (err) {
  //     //when sessionId is not valid
  //     console.log(err);
  //     res.clearCookie("sessionId");
  //     res.render("qna", {
  //       status: false,
  //       name: "",
  //       qnaList: "",
  //     });
  //   }
  //   console.log(decodedToken);
  //   const query = `select * from users where uid = ${decodedToken}`;

  //   db.query(query, (err, rows, fields) => {
  //     if (err) {
  //       console.log(err);
  //       res.clearCookie("sessionId");
  //       res.render("qna", {
  //         status: false,
  //         name: "",
  //         qnaList: "",
  //       });
  //     } else {
  //       if (!rows.length) {
  //         console.log("   !!!!SessionId is Invalid!!!!");
  //         res.clearCookie("sessionId");
  //         res.render("qna", {
  //           status: false,
  //           name: "",
  //           qnaList: "",
  //         });
  //       } else {
  //         console.log("   SessionId Confirmed!");
  //         res.render("qna", {
  //           status: true,
  //           name: rows[0].name,
  //           qnaList: "",
  //         });
  //       }
  //     }
  //   });
  // }
=======
  var questions = undefined;
  db.query(
    `select pid, title, writer_id from questions where pid between 30 and 39`,
    (err, rows, fields) => {
      console.log(rows);
      if (err) {
        res.render("qna", {
          status: false,
          name: "",
          qna: "",
        });
      } else {
        questions = JSON.parse(JSON.stringify(rows));
        console.log(questions);
        if (!req.cookies.sessionId) {
          console.log("   !!!!SessionId is empty!!!!");
          res.render("qna", {
            status: false,
            name: "",
            questions: questions,
            qna: "",
          });
        } else {
          try {
            var decodedToken = jwt.verify(req.cookies.sessionId, "ang")["uid"];
          } catch (err) {
            //when sessionId is not valid
            console.log(err);
            res.clearCookie("sessionId");
            res.render("qna", {
              status: false,
              name: "",
              questions: questions,
              qna: "",
            });
          }
          console.log(decodedToken);
          const query = `select * from users where uid = ${decodedToken}`;

          db.query(query, (err, rows, fields) => {
            if (err) {
              console.log(err);
              res.clearCookie("sessionId");
              res.render("qna", {
                status: false,
                name: "",
                questions: questions,
                qna: "",
              });
            } else {
              if (!rows.length) {
                console.log("   !!!!SessionId is Invalid!!!!");
                res.clearCookie("sessionId");
                res.render("qna", {
                  status: false,
                  name: "",
                  questions: questions,
                  qna: "",
                });
              } else {
                const category = "문법";
                const title = "asdklfjasdkl";
                const pid = "1";

                const qnaList = ` <a class="question-container" href="/qna/detail/${pid}">
                <p class="category">[${category}]</p>
                <p class="qnaTitle">Q: ${title}</p>
              </a>
              `;
                console.log("   SessionId Confirmed!");
                res.render("qna", {
                  status: true,
                  name: rows[0].name,
                  questions: questions,
                  qnaList: qnaList,
                });
              }
            }
          });
        }
      }
    }
  );
>>>>>>> a07a42d64a2507470a413e693b7858df0f6076c7
};
