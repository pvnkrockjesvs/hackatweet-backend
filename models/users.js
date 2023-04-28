const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
    firstname: String,
    pp: {type: String, default: 'http://www.anagard.com/blog/wp-content/uploads/2014/02/2011-03-12-twitter-egg.png'},
    tweets: [{type: mongoose.Schema.Types.ObjectId, ref: 'tweets'}]
})

const User = mongoose.model('users', userSchema)
module.exports = User