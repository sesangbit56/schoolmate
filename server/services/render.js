exports.homeRoutes = (req, res) => {
  console.log(req.session);
  const status = req.session.login;
  const name = req.session.name;
  console.log(name);
  req.session.login = undefined;
  req.session.name = undefined;
  res.render("index", {
    status: status,
    name: name,
  });
};

exports.signRoutes = (req, res) => {
  res.render("sign");
};
