var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const { default: User } = require('../models/users');
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
