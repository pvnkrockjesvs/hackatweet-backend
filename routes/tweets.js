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

router.post('signup', (req,res) => {
    if (!checkBody(req.body, ['username', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    User.findOne({username: req.body.username}).then(data => {
        if (data === null) {
            const hash = bcrypt.hashSync('password', 10);

            const newUser = new User({
                username: req.body.username,
                password: hash,
                token: uid2(32),
                pp: req.body.pp,
                name: req.body.name       
            })

            newUser.save().then(user => {
                res.json({ result: true, newUser})
            })
        } else {
            res.json({ result: false, error: 'User already in db' });
        }
    })
})

module.exports = router;
