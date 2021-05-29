var express = require('express');
var router = express.Router();
const services = require("../services/render");

/* GET home page. */
router.get('/', services.homeRoutes);

module.exports = router;
