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

   
   const newTweet = new Tweet({
      text: req.body.text,
      date: Date.now(),
      user: {_id: req.body.token}
   })

   newTweet.save().then(tweet => {
      res.json({ result: true, tweet})
   })


})

module.exports = router;
