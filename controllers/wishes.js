const express = require('express')
const router = express.Router()
const Wish = require('../models/wishes')

// Home route:
router.get('/wishlist', (req,res)=>{
    Wish.find({}, (err, wishes) =>{
        res.render('index', {
            wishes,
            // username: req.session.username
        })  
    })
})

router.get('/wishlist/new', (req,res)=>{
    res.render('new')
})

router.get('/wishlist/:id', (req,res)=>{
    Wish.findById(req.params.id, (err, foundWish)=>{
        res.render('show.ejs', {wish: foundWish})
    })
})

router.get('/wishlist/:id/edit', (req,res)=>{
    Wish.findById(req.params.id, (err, wishSelected)=>{
        res.render('edit', {wish: wishSelected})
    })
})

router.post('/wishlist', (req,res)=> {
    Wish.create(req.body, (err, newWish)=>{
        res.redirect('/wishlist')
    })
})


router.put('/wishlist/:id', (req,res)=>{
    Wish.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedWish)=>{
        res.render('show', {wish: updatedWish})
    })
})

router.delete('/wishlist/:id', (req,res)=> {
    Wish.findByIdAndDelete(req.params.id, (err, wishDeleted)=>{
        res.redirect('/wishlist')
    })
})
module.exports = router