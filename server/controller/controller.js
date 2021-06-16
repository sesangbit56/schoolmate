const jwt = require("jsonwebtoken");
const querystring = require("querystring");

const testdb = require("./database/database");

const bodyParser = require("body-parser");
const sha256 = require("sha256");
const url = require("url");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "158.247.222.53",
  user: "dev",
  password: "13975",
  database: "schoolmate",
});
db.connect();

exports.registerControll = async (req, res) => {
  let status = false;
  let msg = "";

  req.body.password = sha256(req.body.password);

  var query = [
    `SELECT id FROM users WHERE id = "${req.body.id}"`,
    `INSERT INTO users set ?`,
  ];

  try {
    if (!(await testdb.searchQuery(query[0])).length) {
      await testdb.changeQuery(query[1], req.body);
      status = true;
      msg = "register completed successfully";
    } else {
      msg = "Redundanted id";
    }
  } catch (e) {
    msg = e;
  }

  return res.status(200).json({
    status: status,
    msg: msg,
  });
};

exports.loginPostControll = (req, res) => {
  console.log("login POST====================================");
  console.log(`   got email : ${req.body.email}`);
  console.log(`   got password : ${req.body.password}`);
  const sql = `SELECT password, name, uid FROM users WHERE id = "${req.body.email}"`;
  db.query(sql, (err, rows) => {
    console.log(`   query result : ` + rows);
    if (err) {
      console.log(err);
      return res.status(500).json({
        login: false,
        msg: "sql error",
      });
    } else {
      if (!rows.length) {
        return res.status(400).json({
          login: false,
          msg: "Invalid Id",
        });
      } else if (rows[0].password === sha256(req.body.password)) {
        let token = jwt.sign({ uid: rows[0].uid }, "ang");
        res.cookie("sessionId", token, {
          maxAge: 36000000,
        });
        res.status(200).json({
          login: true,
          msg: "login SUCCESS",
        });
      } else {
        res.clearCookie("sessionId");
        return res.status(404).json({
          login: false,
          msg: "Invalid password",
        });
      }
    }
  });
};

exports.logoutControll = (req, res) => {
  console.log("logout GET====================================");
  if (!req.cookies.sessionId) {
    console.log("   sessionId Empty...");
    return res.status(401).json({
      logout: false,
      msg: "sessionId is not exist",
    });
  } else {
    const sessionId = req.cookies.sessionId;
    console.log("   sessionId : " + sessionId);
    res.clearCookie("sessionId");
    res.status(200).json({
      logout: true,
      msg: "logout SUCCESS",
    });
  }
};

exports.userGetControll = (req, res) => {
  console.log("got /user request!");
  try {
    var parsedUrl = url.parse(req.url);
    const email = querystring.parse(parsedUrl.query, "&", "=").email;

    if (email.length == 0) {
      return res.status(400).json({
        err: "Invalid id",
      });
    }

    const sql = `SELECT * FROM users WHERE id = "${email}"`;
    db.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: "Invalid id",
        });
      } else {
        try {
          return res.status(200).json({
            uid: rows[0].uid,
            name: rows[0].name,
            age: rows[0].age,
          });
        } catch (e) {
          console.log(e);
          return res.status(500).json({
            err: "Server error",
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.questionPostControll = (req, res) => {
  console.log("got /qna/question request!");
  try {
    const sessionId = req.cookies.sessionId;
    const title = req.body.title || "";
    const category = req.body.category || "";
    const main_text = req.body.main_text || "";
    console.log(sessionId);

    const uid = jwt.verify(sessionId, "ang")["uid"];
    console.log(uid);
    let writer_id = "";

    db.query(`select name from users where uid = ${uid}`, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        console.log(rows[0].name);
        writer_id = rows[0].name;

        // console.log(title, writer_id, category, main_text);

        if (
          !title.length ||
          !writer_id.length ||
          !category.length ||
          !main_text.length
        ) {
          return res.status(401).json({
            post: false,
            err: "Invalid field values",
          });
        }

        const query = `INSERT INTO questions (title, writer_id, category, timestamp, main_text) VALUES("${title}", "${writer_id}", "${category}", (now()), "${main_text}")`;
        db.query(query, (err, rows, fields) => {
          if (err) {
            return res.status(500).json({
              post: false,
              err: err,
            });
          } else {
            console.log(rows.insertId);

            return res.status(201).json({
              post: true,
              pid: rows.insertId,
            });
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.qnaListGetControll = (req, res) => {
  console.log("got /qna/list request!");
  var parsedUrl = url.parse(req.url);
  const page = querystring.parse(parsedUrl.query, "&", "=").page;

  console.log(page);

  if (!page.length) {
    return res.status(401).json({
      result: "",
    });
  }

  const query = `SELECT * FROM questions ORDER BY pid DESC LIMIT ${
    (page - 1) * 25
  }, 25`;
  db.query(query, (err, rows, fields) => {
    if (err) {
      return res.status(500).json({
        result: "",
        err: err,
      });
    } else {
      return res.status(200).json({
        result: rows,
      });
    }
  });
};

exports.questionDeleteControll = (req, res) => {
  console.log(req.params.pid);
  const pid = req.params.pid;

  db.query(`select * from questions where pid=${pid}`, (err, rows, fields) => {
    if (err) {
      return res.status(500).json({
        delete: false,
        err: err,
      });
    } else {
      if (!rows.length) {
        return res.status(401).json({
          delete: false,
          err: "post isn't exist",
        });
      } else {
        const query = `delete from questions where pid=${pid}`;
        db.query(query, (err, rows, fields) => {
          if (err) {
            return res.status(500).json({
              delete: false,
              err: err,
            });
          } else {
            return res.status(200).json({
              delete: true,
            });
          }
        });
      }
    }
  });
};

exports.questionPutControll = (req, res) => {
  console.log("got");
  console.log(req.params.pid);
  console.log(req.body.fixed_text);
  const pid = req.params.pid;
  const fixed_text = req.body.fixed_text;

  if (!fixed_text.length) {
    console.log("empty main_text");
    return res.status(401).json({
      adjust: false,
      msg: "Empty text!",
    });
  } else {
    //글에 값이 있다면
    const query = `update questions set main_text="${fixed_text}" where pid=${pid}`;
    db.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          adjust: false,
          msg: err,
        });
      } else {
        return res.status(201).json({
          adjust: true,
          msg: "adjust SUCCESS",
        });
      }
    });
  }
};

exports.questionGetControll = (req, res) => {
  const pid = req.body.pid;
  console.log("got");
  console.log(req.body.pid);

  db.query(
    `select * from questions where pid = ${pid}`,
    (err, rows, fields) => {
      if (err) {
        console.log("something went wrong");
        return res.status(500).json({
          post: false,
          msg: "Server error",
        });
      } else {
        if (!rows.length) {
          console.log("Invalid pid");
          return res.status(400).json({
            post: false,
            msg: "Invalid pid",
          });
        } else {
          return res.status(200).json({
            post: true,
            title: rows[0].title,
            writer_id: rows[0].writer_id,
            main_text: rows[0].main_text,
            timestamp: rows[0].timestamp,
          });
        }
      }
    }
  );
};

exports.answerPostControll = (req, res) => {
  console.log("got /qna/detail/answer request!");
  try {
    const sessionId = req.cookies.sessionId;
    const pointer = req.body.pointer || "";
    const main_text = req.body.main_text || "";
    console.log(sessionId);

    const uid = jwt.verify(sessionId, "ang")["uid"];
    console.log(uid);
    let writer_id = "";

    db.query(`select name from users where uid = ${uid}`, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        console.log(rows[0].name);
        writer_id = rows[0].name;

        console.log(pointer, writer_id, main_text);

        if (!pointer.length || !writer_id.length || !main_text.length) {
          return res.status(401).json({
            post: false,
            err: "Invalid field values",
          });
        }

        const query = `INSERT INTO answers (pointer, writer_id, timestamp, main_text) VALUES('${pointer}', '${writer_id}', (now()), '${main_text}')`;
        db.query(query, (err, rows, fields) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              post: false,
              err: err,
            });
          } else {
            return res.status(201).json({
              post: true,
            });
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.answerGetControll = (req, res) => {
  const pid = parseInt(req.params.pid);
  console.log(pid);

  const query = `select * from answers where pointer = ${pid}`;
  testdb.sendQuery(query).then((result) => {
    console.log(result);
    db.query(query, (err, rows) => {
      if (err) {
        return res.status(500).json({
          get: false,
          msg: err,
        });
      } else {
        console.log(rows);
        return res.status(200).json({
          get: true,
          msg: rows,
        });
      }
    });
  });
};

exports.ratePostControll = (req, res) => {
  const rate = req.body.rate;
  const aid = req.params.aid;

  const sessionId = req.cookies.sessionId;

  console.log(sessionId);

  const rater_uid = jwt.verify(sessionId, "ang")["uid"];

  db.query(
    `select count(*) as cnt from rates where rater_uid = ${rater_uid} and pointer = ${aid}`,
    (err, rows) => {
      if (err || rows[0].cnt > 0) {
        return res.status(400).json({
          post: false,
          msg: "you picked the wrong house",
        });
      } else {
        const query = `insert into rates(rater_uid, pointer, rating) values(${rater_uid}, ${aid}, ${rate})`;

        db.query(query, (err, rows1) => {
          if (err) {
            console.log("something went wrong");
          } else {
            db.query(
              `update answers set rate_count = rate_count + 1 where aid = ${aid}`,
              (err, rows2) => {
                if (err) {
                  console.log("something went wrong 222");
                } else {
                  db.query(
                    `select answers.rate_count, rates.rating from answers join rates on answers.aid = rates.pointer where answers.aid = ${aid}`,
                    (err, rows3) => {
                      let sum = 0;
                      for (let i = 0; i < rows3[0].rate_count; i++) {
                        sum += rows3[i].rating;
                      }
                      db.query(
                        `update answers set rate = ${
                          sum / rows3[0].rate_count
                        } where aid = ${aid}`,
                        (err, rows4) => {
                          return res.status(200).json({
                            post: true,
                          });
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
};

exports.rateGetControll = (req, res) => {
  const aid = req.params.aid;

  db.query(`select rate from answers where aid = ${aid}`, (err, rows) => {
    if (err) {
      return res.status(500).json({
        get: false,
        msg: "Something went wrong...",
      });
    } else {
      return res.status(200).json({
        get: true,
        msg: rows[0].rate,
      });
    }
  });
};
