
module.exports = function({movieTop250Repository, movieTrendingRepository, favouritesRepository, watchlistRepository, reviewsRepository, apiRepository}){
	return {
		getAllMoviesFromTop250: function(accountId, callback){
			movieTop250Repository.getAllMovies(function(errors, movies){
				if(errors.length > 0){
					callback(['databaseError'], null)
				} else {
					if(accountId != null){
						const promises = []
						const movs = []
						for(let mov of movies ){

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
						}).catch(function(errors){
							callback(errors, null)
						})
					} else {
						callback([], movies)
					}
				}
			})
		},
		getAllMoviesFromTrending: function(accountId, callback){
			movieTrendingRepository.getAllMovies(function(errors, movies){
				if(errors.length > 0){
					callback(['databaseError'], null)
				} else {
					if(accountId != null){	
						const promises = []
						const movs = []
						for(let mov of movies ){
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
						}).catch(function(errors){
							callback(["Internal error please try again."], null)
						}) 
				} else {
						callback([], movies)
					}
				}
			})
		},


		/* 						FAVOURITES FUNCTIONALITY 					*/
		viewFavourites: function(accountId, callback){
		/*
			Viewing an accounts favourites list.
		*/
			favouritesRepository.getUsersFavourites(accountId, function(error, results){
				callback(error, results)
			})

		},
		
		favourite: function(accountId, movieId, movieTitle, callback){
			if(accountId != null){
				//Check if already favourited
				favouritesRepository.checkIfFavourited(accountId, movieId, function(errors, results){
					if(errors.length > 0){
						callback(errors, null)
					} else {
						if(results.length > 0){
							// Remove from favourites
							favouritesRepository.deleteUserFavourite(accountId, movieId, callback)
						} else {
							// Add to favourites
							favouritesRepository.createUserFavourites(accountId, movieId, movieTitle, callback)
						}
					}
				})
			} else {
				callback(['Please log in to view this page'], null)
			}
			
		},
		
		/*						 WATCHLIST FUNCTIONALITY						*/


		viewWatchlist: function(accountId, callback){
			/*
				Viewing an accounts watchlist.
			*/
				watchlistRepository.getUsersWatchlist(accountId, function(error, results){
					if(error.length > 0){
						callback(error, null)
					} else {
						callback([], results)
					}
				})

		},
		watchlist: function(accountId, movieId, movieTitle, callback){
			if(accountId != null){
				//Check if already favourited
				watchlistRepository.checkIfWatchlisted(accountId, movieId, function(errors, results){
					if(errors.length > 0){
						callback(errors, null)
					} else {
						if(results.length > 0){
							watchlistRepository.deleteUserWatchlistItem(accountId, movieId, callback)
						} else {
							// Add to favourites
							watchlistRepository.createUserWatchlistItem(accountId, movieId, movieTitle, callback)
						}
					}
				})
			} else {
				callback(['Please log in to view this page'], null)
			}
			
		},

		/* 						PUBLIC REVIEWS 					*/

		createReview: function(accountId, review, movieId, callback){
			reviewsRepository.createReview(accountId, review, movieId, callback)
		},

		updateReview: function(id, accountId, review, movieId, callback){
			reviewsRepository.updateReview(id, accountId, review, movieId, callback)
		},

		deleteReview: function(id, accountId, callback){
			reviewsRepository.deleteReview(id, accountId, callback)
		},

		getPublicReviewById: function(reviewId, callback){
			reviewsRepository.getReviewById(reviewId, callback)
		},

		getReviewsByMovieId: function(movieId, callback){
			reviewsRepository.getReviewsByMovieId(movieId, callback)
		},

		getAllPublicReviews: function(callback){
			reviewsRepository.getAllReviews(callback)
		}
	}
}
