const mongoose = require('./connection')
const Wish = require('../models/wishes')
const wishlistSeeds = require('./seeds.json')

Wish.deleteMany({})
.then(()=>{
    return Wish.insertMany(wishlistSeeds)
})
.then(data => console.log(data))
.catch(err => console.log(err))
.finally(()=>{
    process.exit()
})