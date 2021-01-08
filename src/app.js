const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getGeoData = require('./utils/geo')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Define handlebars engine and views dir
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Define static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ali'
    })
})

console.log('Test')

app.get('/products', (req, res) => {

    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })

    } else {

        console.log(req.query.rating)

        res.send ({
            products: []
        })
    }
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ali'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    
    } else {

        const geoData = getGeoData(req.query.address, function(error, data) {

            if (error) {
                return res.send({ error })
            }
            
            const forecastData = forecast(data, (error, weatherData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: weatherData.description,
                    location: data.location,
                    address: req.query.address
                })
            })
        })

    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ali'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})