const request = require('request')
const API_KEY_1 = "k_9t0l0iej"

module.exports = function({}){
    return {
        getSearchMovieByTitle: function(keywords, callback){
            request('https://imdb-api.com/en/API/SearchMovie/'+API_KEY_1+'/'+keywords, { json: true}, (error, responsee, body) => {
                if(error || body.errorMessage != ""){
                    callback(error, null)
                } else {
                    callback(null, body)
                }
            })
        },
        getMostPopularMovies: function(callback){
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
    }
}