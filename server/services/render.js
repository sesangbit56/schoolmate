exports.homeRoutes = (req, res) => {
  console.log(req);
  res.render("index", {
    status: req.body.login,
    name: "장정인",
  });
};

exports.signRoutes = (req, res) => {
  res.render("sign");
};
