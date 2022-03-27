//Use the Request library for the API calls. The most simple one out there
//https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

const request = require('request')
const API_KEY_1 = "k_9t0l0iej"

module.exports = function({}){
    return {
        getSearchMovieByTitle: function(keywords, callback){
            request('https://imdb-api.com/en/API/SearchMovie/'+API_KEY_1+'/'+keywords, { json: true}, (error, response, body) => {
                /*if(error || body.errorMessage != ""){
                    callback(error, null)
                } else {
                    callback(null, body)
                } */
                console.log("keywords: ", keywords)
                if(error != null){
                    console.log("error: ", error)
                    if(error.length > 0){
                        callback(["Error making request"], null)
                    }
                } else {
                    if(body.errorMessage != ""){
                        console.log("bodyerr:" +body.errorMessage)
                        callback(["Server error"], null)
                    } else {
                        //console.log("body: ",  body)
                        callback([], body)
                    }
                }
            })
        },

        /*
			Gets a movie from the API using its title id.
		*/
        getMovieByTitleId: function(titleId, callback){
            request('https://imdb-api.com/en/API/Title/'+API_KEY_1+'/'+titleId, { json:true }, (err, res, body) => {

                // TODOO: error handling
                if(err != null){
                    console.log("err: " + err)
                    if(err.length > 0){
                        console.log("err len: "+ err)
                    }
                } else {
                    if(body.errorMessage != null){
                        console.log(body.errorMessage)
                    }
                    //console.log(body.title)
                    callback([], body)
                }
            })
        },


        getMostPopularMovies: function(callback){
            request('https://imdb-api.com/en/API/MostPopularMovies/'+API_KEY_1, { json: true }, (err, res, body) => {
                if (err || body.errorMessage != "") {
                    callback(err, null)
                } else {
                    //console.log(body.items)
                    callback([], body.items)
                }
                // console.log(body.url);
                // console.log(body.explanation);
            });
        }
    }
}