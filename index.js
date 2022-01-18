require('dotenv').config()
const express = require('express')
const multer = require('multer')
const app = express()
const {SESSION_SECRET} = process.env
const PORT = process.env.PORT || 3000


// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images')
//     },
//     filename: (req, file, cb)=> {
//         cb(null, Date.now()+ "--" + file.originalname);
//     }
// })


// app.post("/single", upload.single('image'),(req, res)=> {
//     console.log(req.file)
//     res.send("Single File upload successful")
// })

const methodOverride = require('method-override')


app.use(express.urlencoded({extended:false}))

app.use(express.static('public'))
app.use(methodOverride('_method'))

const expressEJSLayouts = require('express-ejs-layouts')
const session = require('express-session')
const wishController = require('./controllers/wishes')
const sessionController = require('./controllers/session')



const routeHit = (req,res,next)=> {
    console.log('Route was hit')
    next()
}
app.use(routeHit)



app.use(expressEJSLayouts)
app.set('view engine', 'ejs')

// session middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
  

app.use((req,res,next)=>{
    res.locals.username = req.session.username
    // Making username available in all views
    next()
})

app.use(wishController)
app.use(sessionController)


app.listen(PORT, ()=> console.log(`Can you feel the love on Port ${PORT}`))
