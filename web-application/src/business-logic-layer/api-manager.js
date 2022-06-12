
module.exports = function({apiRepository, favouritesRepository, watchlistRepository}){
    return {
        getSearchMovieByTitle:  function(accountId, keywords, callback){
            const acceptableKeywords = encodeURIComponent(keywords.trim())
            apiRepository.getSearchMovieByTitle(acceptableKeywords, function(error, result){
                if(error.length > 0){
                    callback(['There is a problem with the API we are using'], null)
                } else {
                    const movies = result.results
                    if(accountId != null){
						const promises = []
						const movs = []
						for(let mov of result.results){
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
						Promise.all(promises).then((res) => {
							callback([], result)
						})
					} else {
						callback([], result)
					}
                }
            })
        },
        // Get movie by its imdb id:
        getMovieByMovieId: function(movieId, callback){
			if(movieId != null){
				apiRepository.getMovieByMovieId(movieId, callback)
			} else {
				callback(["Invalid movieId"], null)
			}
        }
    }
}