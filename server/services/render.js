exports.homeRoutes = (req, res) => {
  res.render("index", {
    status: true,
    name: "장정인",
  });
};

exports.registerRoutes = (req, res) => {
  res.render("signIn");
};
