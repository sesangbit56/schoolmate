const mysql = require("mysql");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

//complete
const buildSearchQuery = (search) => {
  return new Promise((resolve) => {
    let searchQuery = ``;
    if (!search) {
      resolve(searchQuery);
    }

    const words = search.split(" ");
    searchQuery = `where title regexp '${words[0]}`;
    for (let i = 1; i < words.length; i++) {
      searchQuery += `|${words[i]}`;
    }
    searchQuery += `'`;
    resolve(searchQuery);
  });
};

//complete
const getQnaCount = (search) => {
  return new Promise((resolve) => {
    buildSearchQuery(search).then((searchQuery) => {
      db.query(
        `select count(*) as cnt from questions ` + searchQuery,
        (err, rows) => {
          if (err) {
            console.log(err);
            resolve(0);
          } else {
            console.log(rows[0].cnt);
            resolve(rows[0].cnt);
          }
        }
      );
    });
  });
};

//complete
exports.getQnaPageList = (list, search) => {
  return new Promise((resolve) => {
    getQnaCount(search).then((count) => {
      let qnaPageList = ``;
      if (!search) {
        for (let i = list - 5 < 1 ? 1 : list - 4; i < list; i++) {
          qnaPageList += `<a href="/qna?list=${i}"><div class="qnaPageList-container"><p class="qnaPageList-box">${i}</p></div></a>`;
        }
        qnaPageList += `<a href="/qna?list=${list}"><div class="selected-page"><p class="qnaPageList-box">${list}</p></div></a>`;
        for (
          let i = parseInt(list) + 1;
          i <= Math.ceil(count / 25) && i < parseInt(list) + 5;
          i++
        ) {
          qnaPageList += `<a href="/qna?list=${i}"><div class="qnaPageList-container"><p class="qnaPageList-box">${i}</p></div></a>`;
        }
        console.log(qnaPageList);
        resolve(qnaPageList);
      }
      for (let i = list - 5 < 1 ? 1 : list - 4; i < list; i++) {
        qnaPageList += `<a href="/qna?search=${search}&list=${i}"><div class="qnaPageList-container"><p class="qnaPageList-box">${i}</p></div></a>`;
      }
      qnaPageList += `<a href="/qna?search=${search}&list=${list}"><div class"selected-page"><p class="qnaPageList-box">${list}</p></div></a>`;
      for (
        let i = parseInt(list) + 1;
        i <= Math.ceil(count / 25) && i < parseInt(list) + 5;
        i++
      ) {
        qnaPageList += `<a href="/qna?search=${search}&list=${i}"><div class="qnaPageList-container"><p class="qnaPageList-box">${i}</p></div></a>`;
      }
      console.log(qnaPageList);
      resolve(qnaPageList);
    });
  });
};

exports.getQnaList = (list, search) => {
  return new Promise((resolve) => {
    getQnaCount(search).then((count) => {
      let qnaList = ``;
      buildSearchQuery(search).then((searchQuery) => {
        if (Math.ceil(count / 25) >= list && list > 0) {
          db.query(
            `select category, pid, title from questions ` +
              searchQuery +
              ` order by pid desc limit ${(list - 1) * 25}, 25 `,
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
  });
};

exports.getRecommendedQuestions = () => {
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
