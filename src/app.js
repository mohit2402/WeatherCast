const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'mohit'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'mohit'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is some helpful Text',
        title: 'Help',
        name: 'mohit'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            })


        })
    })

    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'mohit',
        errorMessage: 'Help Article Not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'mohit',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})