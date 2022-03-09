//Use the Request library for the API calls. The most simple one out there
//https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

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

        /*
			Gets a movie from the API using its title id.
		*/
        getMovieByTitleId: function(titleId, callback){
            console.log(titleId)
            request('https://imdb-api.com/en/API/Title/'+API_KEY_1+'/'+titleId, { json:true }, (err, res, body) => {

                // TODOO:
                //console.log("test1")
                //const movie = JSON.parse(body)
                console.log(body.fullTitle);
                if(err || body.errorMessage != ""){
                    console.log(body.errorMessage, "test2")
                    callback(err, null)
                } else {
                    console.log("test3")
                    console.log(body.items)
                    callback(null, body.items)
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