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
                console.log(createdUser)
                res.send('check terminal')
            }
        }else {
            res.send(`Passwords must match.`)
        }
     } catch(err){
         next(err)
     }
 })

 module.exports = router