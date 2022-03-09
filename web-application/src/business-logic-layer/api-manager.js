
module.exports = function({apiRepository}){
    return {

        getSearchMovieByTitle:  function(keywords, callback){
            const acceptableKeywords = encodeURIComponent(keywords.trim())
            apiRepository.getSearchMovieByTitle(acceptableKeywords, function(error, results){
                if(error){
                    callback(['There is a problem with the API we are using'], null)
                } else {
                    callback([], results)
                    //console.log(results)
                }
            })
        },

        // Get movie by its imdb id:
        getMovieByTitleId: function(titleId, callback){
        	apiRepository.getMovieByTitleId(titleId, callback)
        }
    }
}

/*
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
}*/