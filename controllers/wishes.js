const express = require('express')
const router = express.Router()
const Wish = require('../models/wishes')


router.get('/wishlist', (req,res)=>{
    res.send('Hello')
})



module.exports = router