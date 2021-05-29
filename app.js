const express = require("express");
const createError = require("http-errors");
const app = express();
const jwt = require("jsonwebtoken");

const http = require("http");
const path = require("path");


const indexRouter = require("./server/routes/index");
const { create } = require("domain");

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(
  "/stylesheets", express.static(path.resolve(__dirname, "public/stylesheets"))
  );
app.use(
  "/images", express.static(path.resolve(__dirname, "public/images"))
  );
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  
  res.status(err.stats || 500);
  res.render("error");
})


module.exports = app;