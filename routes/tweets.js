var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const Tweet = require('../models/tweets');
const User = require('../models/users');

/* GET tweets listing. */
router.get('/', function(req, res, next) {
   Tweet.find().populate('user').then(data => {
      res.json({ tweet : data });
   })
});

/* POST a tweet. */
router.post('/', (req, res) => {
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

/* DELETE a tweet */
router.delete('/', (req, res) => {
   Tweet.findByIdAndDelete(req.body.id).then(data => {
      res.json({ result: true, data})
   })
})

module.exports = router;