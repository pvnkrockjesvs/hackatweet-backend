var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const bcrypt = require('bcrypt');
const uid2 = require('uid2');


router.post('/signup', (req,res) => {
  if (!checkBody(req.body, ['username', 'password', 'name'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
  }

  User.findOne({username: req.body.username}).then(data => {
      if (data === null) {
          const hash = bcrypt.hashSync(req.body.password, 10);

          const newUser = new User({
              username: req.body.username,
              password: hash,
              token: uid2(32),
              pp: req.body.pp,
              name: req.body.name       
          })

          newUser.save().then(user => {
              res.json({ result: true, user: newUser });
          })
      } else {
          res.json({ result: false, error: 'User already in db' });
      }
  })
})

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({username: req.body.username}).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password', data });
    }
  })
})

module.exports = router;
