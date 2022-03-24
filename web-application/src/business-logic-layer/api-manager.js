
module.exports = function({apiRepository, favouritesRepository, watchlistRepository}){
    return {

        getSearchMovieByTitle:  function(keywords, callback){
            const acceptableKeywords = encodeURIComponent(keywords.trim())
            apiRepository.getSearchMovieByTitle(acceptableKeywords, function(error, result){
                if(error.length > 0){
                    console.log(error)
                    callback(['There is a problem with the API we are using'], null)
                } else {
                    const movies = result.results
                    if(accountId != null){
						const promises = []
						const movs = []
                        console.log(movies)
						for(let mov of movies){
							promises.push( new Promise(function(resolve, reject ) {
								favouritesRepository.checkIfFavourited(accountId, mov.id, function(error, result) {
									if(error.length > 0){
										reject(error)
									} else {
										if(result.length > 0){
											mov.isFavourited = true
										}
										resolve()
									}
								})
							}))
							promises.push( new Promise(function(resolve, reject ) {
								watchlistRepository.checkIfWatchlisted(accountId, mov.id, function(error, result) {
									if(error.length > 0){
										reject(error)
									} else {
										if(result.length > 0){
											mov.isWatchlisted = true
										}
										resolve()
									}
								})
							}))
						}
						Promise.all(promises).then((result) => {
							callback([], movies)
						})
					} else {
						callback([], movies)
					}

                    //callback([], results)
                    //console.log(results)
                }
            })
        },

        // Get movie by its imdb id:
        getMovieByTitleId: function(titleId, callback){
            //Add error handling for titleId null
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