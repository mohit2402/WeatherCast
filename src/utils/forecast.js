const request = require('postman-request')
require('dotenv').config()

const forecast = (lat, lon, callback) => {

    var token = process.env.FORECAST_TOKEN
    const url = 'http://api.weatherstack.com/current?access_key=' + token + '&query=' + lat + ',' + lon + '&units=m'
    
   //console.log(url)
    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. But feels like ${body.current.feelslike} degrees out and The humidity is ${body.current.humidity}%`)
        }
    })

}

module.exports = forecast