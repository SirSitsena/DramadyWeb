//Use the Request library for the API calls. The most simple one out there
//https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

const request = require("request")
const API_KEY_1 = "k_9t0l0iej"

exports.getMostPopularMovies = function(callback) {
    request('https://imdb-api.com/en/API/MostPopularMovies/'+API_KEY_1, { json: true }, (err, res, body) => {
        if (err || body.errorMessage != "") {
            callback(err, null)
        } else {
            //console.log(body.items)
            callback(null, body.items)
        }
        // console.log(body.url);
        // console.log(body.explanation);
    });
}