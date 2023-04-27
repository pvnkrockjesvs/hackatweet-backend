var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const Tweet = require('../models/tweets');
const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
   Tweet.find().populate('user').then(data => {
      res.json({data})
   })
});

router.post('/post', (req, res) => {
   if (!checkBody(req.body, ['text'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
   }
   
   User.findOne({ token: req.body.token }).then(user => {
      const newTweet = new Tweet({
         text: req.body.text,
         date: Date.now(),
         user: {_id: user._id}
      })

      newTweet.save().then(tweet => {
         res.json({ result: true, tweet})
      })
   })
})

module.exports = router;
