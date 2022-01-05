const mongoose = require('../db/connection')

const wishSchema = new mongoose.Schema({
    wish: {type: String, required: true},
    description: String,
    image: String,
    why: String
})

const Wish = mongoose.model('Wish', wishSchema)

module.exports = Wish