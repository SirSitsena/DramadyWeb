//const movieRepository = require('../data-access-layer/movie-repository')
// const movieValidator = require('./movie-validator')

const { fips } = require("crypto")

module.exports = function({movieTop250Repository, movieTrendingRepository, favouritesRepository, watchlistRepository, reviewsRepository, apiRepository}){
	return {
		getAllMoviesFromTop250: function(request, callback){
			movieTop250Repository.getAllMovies(function(errors, movies){
				if(errors.length > 0){
					callback(['databaseError'], null)
				} else {
					/* TURN THIS FUNCTION IN TO ASYNC TO MAKE IT WORK
					if(request.session.accountId){
						const accountId = request.session.accountId
						const movs = []
						for(const movie of movies){
							movieRepository.checkIfFavourited(accountId, movie.id, function(error, results){
								if(results.length > 0){
									movie.isFavourited = true
								} else {
									movie.isFavourited = false
								}
								
							})

							movieRepository.checkIfWatchlisted(accountId, movie.id, function(error, results){
								if(results.length > 0){
									movie.isWatchlisted = true
								} else {
									movie.isWatchlisted = false
								}
								movs.push(movie)
							})
							
						}
						callback([], movs)
					} else { */
						callback([], movies)
					//}
				}
			})
		},
		getAllMoviesFromTrending: function(request, callback){
			movieTrendingRepository.getAllMovies(function(errors, movies){
				if(errors.length > 0){
					callback(['databaseError'], null)
				} else {
					callback([], movies)
				}
			})
		},


		/* 						FAVOURITES FUNCTIONALITY 					*/
		viewFavourites: function(request, callback){
			/*
				Viewing an accounts favourites list.
			*/
			if(request.session.accountId){
				favouritesRepository.getUsersFavourites(request.session.accountId, function(error, results){
					console.log(results)
				})
			} else {
				callback(['Please log in to view this page.'], null)
			}
		},
		
		favourite: function(request, titleId, movieTitle, callback){
			// TODO: Check if user logged in
			// TODO ERROR HANDLING
			
			if(request.session.accountId){
				const accountId = request.session.accountId
				//Check if already favourited
				favouritesRepository.checkIfFavourited(accountId, titleId, function(errors, results){
					//console.log(results)
					if(errors.length > 0){
						//error
						console.log(errors)
					} else {
						if(results.length > 0){
							// Remove from favourites
							//console.log("already on favourites")
							favouritesRepository.deleteUserFavourite(accountId, titleId, callback)
						} else {
							// Add to favourites
							//Get current time
							const date = new Date().toJSON().slice(0, 10)
							//console.log("added to favourites")
							favouritesRepository.createUserFavourites(accountId, titleId, movieTitle, date, callback)
						}
					}
				})
			} else {
				callback(['Please log in to view this page'], null)
			}
			
		},
		
		/*						 WATCHLIST FUNCTIONALITY						*/

		promiseWatchlistMovie: function(id){
			return new Promise(function(resolve, reject) {
				apiRepository.getMovieByTitleId(id, function(error, movie){
					if(error){
						reject(error)
					} else {
						console.log(movie)
						resolve(movie)
					}
				})
			})
		},

		viewWatchlist: function(request, callback){
			/*
				Viewing an accounts watchlist.
			*/
			if(request.session.accountId){
				watchlistRepository.getUsersWatchlist(request.session.accountId, function(error, results){
					/* calling the api to fetch more info on each movie, maybe it will not be used.
					for(var mov of results){
						//console.log(mov.movieId)
						moviePromises.push( new Promise(function(resolve, reject) {
							apiRepository.getMovieByTitleId(mov.movieId, function(error, movie){
								if(error){
									reject(error)
								} else {
									//console.log(movie)
									resolve(movie)
								}
							})
						})) 
					}
					Promise.all(moviePromises).then((movies) => {
						console.log("promises resolved")
						for(var aMovie of movies){
							console.log(aMovie.title)
						}
					})*/

					//console.log(movieIds)
					if(error.length > 0){
						callback(error, null)
					} else {
						callback([], results)
					}
				})
			} else {
				callback(['Please log in to view this page.'], null)
			}
		},
		watchlist: function(request, titleId, movieTitle, callback){
			// TODO: Check if user logged in
			// TODO ERROR HANDLING
			if(request.session.accountId){
				const accountId = request.session.accountId
				//Check if already favourited
				watchlistRepository.checkIfWatchlisted(accountId, titleId, function(errors, results){
					//console.log(results)
					if(errors.length > 0){
						//error
						console.log(errors)
					} else {
						if(results.length > 0){
							// Remove from favourites
							//console.log("already on favourites")
							watchlistRepository.deleteUserWatchlist(accountId, titleId, callback)
						} else {
							// Add to favourites
							//Get current time
							const date = new Date().toJSON().slice(0, 10)
							//console.log("added to favourites")
							watchlistRepository.createUserWatchlist(accountId, titleId, movieTitle, date, callback)
						}
					}
				})
			} else {
				callback(['Please log in to view this page'], null)
			}
			
		},

		/* 						PUBLIC REVIEWS 					*/

		createPublicReview: function(accountId, review, titleId, callback){
			reviewsRepository.createPublicReview(accountId, review, titleId, callback)
		},
		updatePublicReview: function(id, accountId, review, titleId, callback){
			reviewsRepository.updatePublicReview(id, accountId, review, titleId, callback)
		},

		getPublicReviewById: function(reviewId, callback){
			reviewsRepository.getPublicReviewById(reviewId, callback)
		},

		getReviewsByTitleId: function(titleId, callback){
			reviewsRepository.getReviewsByTitleId(titleId, callback)
		},

		getAllPublicReviews: function(callback){
			reviewsRepository.getAllPublicReviews(callback)
		}
	}
}
