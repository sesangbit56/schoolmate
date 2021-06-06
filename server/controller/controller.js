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
  console.log("got request!");
  console.log(req.body.email);
  console.log(req.body.password);
  const sql = `SELECT password, name, uid FROM users WHERE id = "${req.body.email}"`;
  db.query(sql, (err, rows) => {
    if (err)
      return res.status(500).json({
        login: false,
        result: "sql error",
        err: err,
      });
    else {
      try {
        console.log(rows);
        if (rows[0].password === sha256(req.body.password)) {
          let token = jwt.sign({ uid: rows[0].uid }, "ang");
          return res.status(200).json({
            login: true,
            token: token,
          });
        } else {
          return res.status(404).json({
            result: "invalid id",
          });
        }
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          login: false,
          result: "invalid password",
        });
      }
    }
  });
};

exports.loginGetControll = (req, res) => {
  console.log("got authorization request!");
  const decodedToken = jwt.verify(
    req.headers.authorization.split(" ")[0],
    "ang"
  )["uid"];
  const query = `select * from users where uid = ${decodedToken}`;

  db.query(query, (err, rows, fields) => {
    console.log(rows);
    if (err) {
      console.log(err);
      return res.status(401).json({
        login: false,
      });
    } else {
      if (!rows.length) {
        // req.session.login = false;
        // req.session.name = "";
        return res.status(401).json({
          login: false,
        });
      } else {
        return res.status(200).json({
          login: true,
          name: rows[0].name,
        });
      }
    }
  });
};

exports.userGetControll = (res, res) => {
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
