const request = require("postman-request")

const forecast = (geo, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3c657d000005ec8c4a0efb1f8536a8c2&query=" + geo.latitude + "," + geo.longitude + "&units=m"

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)

        } else if (body.error) {
            callback('Unable to get weather for location', undefined)

        } else {
            const data = body.current

            console.log(data)

            callback(undefined, {
                description: "In " + geo.location + " it's currently " + data.temperature + " degrees and " + data.weather_descriptions[0] + ".  It feels like " + data.feelslike + " degrees and there is a wind speed of " + data.wind_speed,
                temperature: data.temperature,
                feelslike: data.feelslike
            })
        }
    })
}

module.exports = forecast