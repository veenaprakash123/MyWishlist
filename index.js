const express = require('express')
app = express()
PORT = 3000

const methodOverride = require('method-override')


app.use(express.urlencoded({extended:false}))

app.use(express.static('public'))
app.use(methodOverride('_method'))

const expressEJSLayouts = require('express-ejs-layouts')
const wishController = require('./controllers/wishes')



const routeHit = (req,res,next)=> {
    console.log('Route was hit')
    next()
}
app.use(routeHit)



app.use(expressEJSLayouts)
app.set('view engine', 'ejs')


app.use(wishController)


app.listen(PORT, ()=> console.log(`Can you feel the love on Port ${PORT}`))
