const mongoose = require('../db/connection')

const wishSchema = new mongoose.Schema({

    name: {type: String, required: true},
    description: String,
    image: String,
    why: String,
    shop: String
})

const Wish = mongoose.model('Wish', wishSchema)

module.exports = Wish