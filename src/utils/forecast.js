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
            callback(undefined, `It is currently ${body.current.temperature} degress out. There is a ${body.current.precip}% chance of rain`)
        }
    })

}

module.exports = forecast