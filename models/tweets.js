const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    text: String,
    date: Date,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

const Tweet = mongoose.model('tweets', tweetSchema)
export default Tweet