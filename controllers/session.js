const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = express.Router()

router.get('/session', (req,res) => {
    res.send('Session controller working')
 })


 router.get('/session/register',(req, res) =>{
     res.render('session/register.ejs')
 })

 router.post('/session/register', async (req,res,next)=>{
     try {
        if (req.body.password === req.body.verifyPassword){
            // res.send(`Congratulations on creating an account!`)
            const desiredUsername = req.body.username
            const userExists = await User.findOne({username: desiredUsername})
            if (userExists){
                res.send('Username is already taken')
            }else{
                // Here we are encypting the password 
                const salt = bcrypt.genSaltSync(10)
                // Salt is extra "garbage" that gets throen into encrypted password. The more salt, the more secure. 
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                // The first argument is the string we are encypting and the second argument is the salt.
                req.body.password = hashedPassword
                // We are reassigning the password to this new hashed password
                const createdUser = await User.create(req.body)
                req.session.username = createdUser
                res.redirect('/wishlist')
                
            }
        }else {
            res.send(`Passwords must match.`)
        }
     } catch(err){
         next(err)
     }
 })


 router.get('/session/login', (req,res,next)=>{
     res.render('session/login.ejs')
 })

 router.post('/session/login', async (req,res,next)=> {
     try {
        // First we need to find the user that just logged in from the existing users. We first check if the username exists in our database of usernames. 
        const userToLogin = await User.findOne({username: req.body.username})
        if (userToLogin) {
            // Now we check if the passwords match. 
            // We do this with bcrypt.compareSync. compareSync compares the first cleartext argument with the encrypted second argument.
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
             // Returns a boolean, true if they match, false if they don't match.
             if (validPassword){
                req.session.username = userToLogin.username 
                res.redirect('/wishlist')
             } else{
                res.redirect('/session/login')
             }
        } else {
            res.redirect('/session/login')
        }
     } catch (err){
         next(err)
     }
 })

 module.exports = router