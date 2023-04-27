const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    text: String,
    date: Date,
    likes: { type : Number, default : 0},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

const Tweet = mongoose.model('tweets', tweetSchema)
module.exports = Tweet