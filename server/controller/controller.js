const jwt = require("jsonwebtoken");
const querystring = require("querystring");

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

exports.registerControll = (req, res) => {
  console.log("got /register request!");
  try {
    const email = req.body.email || "";
    const password = req.body.password || "";
    const name = req.body.name || "";
    const age = req.body.age || "";
    console.log(
      `email : ${email}, password : ${password}, name : ${name}, age : ${age}`
    );

    if (!email.length || !password.length || !name.length || !age.length) {
      return res.status(400).json({ err: "Incorrect info" });
    }

    console.log("done");
    var sql = `SELECT id FROM users WHERE id = "${email}"`;
    db.query(sql, function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(400).json({ register: false });
      } else {
        console.log(`redundanted email is : ${rows}`);
        if (rows.length) {
          return res.status(400).json({ email: "Redundanted id" });
        } else {
          console.log("Valid email confirmed!");
          db.query(
            `INSERT INTO users (id, name, password, age) VALUES("${email}", "${name}", "${sha256(
              password
            )}", ${parseInt(age)})`,
            function (err, rows, fields) {
              console.log("inserting data into users database.....");
              if (err) {
                console.log(err);
                return res.status(400).json({ register: false });
              } else {
                console.log("SUCCESS!");
                return res.status(201).json({ register: true });
              }
            }
          );
        }
      }
    });
  } catch (e) {
    return res.status(500).json({ err: "Server error" });
  }
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
    db.query(sql, function (err, rows, fields) {
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
    const title = req.body.title || "";
    const writer_id = req.body.writer_id || "";
    const category = req.body.category || "";
    const main_text = req.body.main_text || "";

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
    db.query(query, function (err, rows, fields) {
      if (err) {
        return res.status(500).json({
          post: false,
          err: err,
        });
      } else {
        db.query(
          `select pid from questions order by pid desc limit 1`,
          function (err, rows, fields) {
            if (err) {
              return res.status(500).json({
                post: false,
                err: err,
              });
            } else {
              return res.status(201).json({
                post: true,
                pid: rows[0].pid,
              });
            }
          }
        );
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
  db.query(query, function (err, rows, fields) {
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

  db.query(
    `select * from questions where pid=${pid}`,
    function (err, rows, fields) {
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
          db.query(query, function (err, rows, fields) {
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
    }
  );
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
