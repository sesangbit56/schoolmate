const mysql = require("mysql");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

const getQnaCount = function () {
  return new Promise((resolve) => {
    db.query(`select count(*) as cnt from questions`, (err, rows) => {
      if (err) {
        console.log(err);
        resolve(0);
      } else {
        resolve(rows[0].cnt);
      }
    });
  });
};

exports.getQnaList = function (list) {
  return new Promise((resolve) => {
    getQnaCount().then((count) => {
      if (Math.ceil(count / 25) >= list && list > 0) {
        let qnaList = ``;
        db.query(
          `select category, pid, title from questions order by pid desc limit ${
            (list - 1) * 25
          }, 25 `,
          (err, rows) => {
            if (err) {
              resolve(qnaList);
            } else {
              for (let i = 0; i < rows.length; i++) {
                qnaList =
                  qnaList +
                  `<a class="question-container" href="/qna/detail/${rows[i].pid}">
                        <p class="category">[${rows[i].category}]</p>
                        <p class="qnaTitle">Q: ${rows[i].title}</p>
                      </a>`;
              }
              resolve(qnaList);
            }
          }
        );
      } else {
        console.log("what the fuck");
        resolve(qnaList);
      }
    });
  });
};

exports.getRecommendedQuestions = function () {
  return new Promise((resolve) => {
    db.query(
      `select pid, title, writer_id from questions where pid between 30 and 39`,
      (err, rows) => {
        if (err) {
          resolve({});
        } else {
          const questions = JSON.parse(JSON.stringify(rows));
          resolve(questions);
        }
      }
    );
  });
};
