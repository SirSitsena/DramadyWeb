//Use the Request library for the API calls. The most simple one out there
//https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

const request = require('request')
const API_KEY_1 = "k_9t0l0iej"

module.exports = function({}){
    return {
        getSearchMovieByTitle: function(keywords, callback){
            request('https://imdb-api.com/en/API/SearchMovie/'+API_KEY_1+'/'+keywords, { json: true}, (error, response, body) => {
                if(error != null){
                    if(error.length > 0){
                        callback(["Error making request"], null)
                    }
                } else {
                    if(body.errorMessage != ""){
                        callback(["Server error"], null)
                    } else {
                        callback([], body)
                    }
                }
            })
        },

        /*
			Gets a movie from the API using its title id.
		*/
        getMovieByMovieId: function(movieId, callback){
            request('https://imdb-api.com/en/API/Title/'+API_KEY_1+'/'+movieId, { json:true }, (err, res, body) => {
                // Error handling
                if(err != null){
                    if(err.length > 0){
                    }
                } else {
                    if(body.errorMessage != null){
                    }
                    callback([], body)
                }
            })
        },


        getMostPopularMovies: function(callback){
            request('https://imdb-api.com/en/API/MostPopularMovies/'+API_KEY_1, { json: true }, (err, res, body) => {
                if (err || body.errorMessage != "") {
                    callback(err, null)
                } else {
                    callback([], body.items)
                }
            });
        }
    }
}