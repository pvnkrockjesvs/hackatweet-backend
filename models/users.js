const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    token: String,
    name: String,
    pp: String,
    tweets: [{type: mongoose.Schema.Types.ObjectId, ref: 'tweets'}]
})

const User = mongoose.model('users', userSchema)
module.exports = User