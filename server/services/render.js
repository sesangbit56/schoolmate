exports.homeRoutes = (req, res) => {
  res.render("index", {
    status: false,
    name: "장정인",
  });
};

exports.signRoutes = (req, res) => {
  res.render("sign");
};
