const request = require("postman-request")

const getGeoData = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiYWxpc2FsYW1hbiIsImEiOiJja2plMzQ1dWUzODY2MnpucXNscXkya29rIn0.veVy2UIyR4oRvi4JizmW7g&limit=1"

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to call location services')
        
        } else if (body.features.length == 0) {
            callback('Unable to find location')

        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = getGeoData