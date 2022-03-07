//const movieRepository = require('../data-access-layer/movie-repository')
// const movieValidator = require('./movie-validator')

module.exports = function({movieRepository}){
	return {
		getAllMovies: function(request, callback){
			movieRepository.getAllMovies(function(errors, movies){
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

		// Get movie by its imdb id:
		getMovieByTitleId: function(titleId, callback){
			movieRepository.getMovieByTitleId(titleId, callback)
		},

		
		/* 						FAVOURITES FUNCTIONALITY 					*/
		
		viewFavourites: function(request, callback){
			/*
				Viewing an accounts favourites list.
			*/
			if(request.session.accountId){
				movieRepository.getUsersFavourites(request.session.accountId, callback)
			} else {
				callback(['Please log in to view this page.'], null)
			}
		},
		
		favourite: function(request, titleId, callback){
			// TODO: Check if user logged in
			// TODO ERROR HANDLING
			
			if(request.session.accountId){
				const accountId = request.session.accountId
				//Check if already favourited
				movieRepository.checkIfFavourited(accountId, titleId, function(errors, results){
					//console.log(results)
					if(errors.length > 0){
						//error
						console.log(errors)
					} else {
						if(results.length > 0){
							// Remove from favourites
							//console.log("already on favourites")
							movieRepository.deleteUserFavourite(accountId, titleId, callback)
						} else {
							// Add to favourites
							//Get current time
							const date = new Date().toJSON().slice(0, 10)
							//console.log("added to favourites")
							movieRepository.createUserFavourites(accountId, titleId, date, callback)
						}
					}
				})
			} else {
				callback(['Please log in to view this page'], null)
			}
			
		},
		
		/*						 WATCHLIST FUNCTIONALITY						*/
		viewWatchlist: function(request, callback){
			/*
				Viewing an accounts watchlist.
			*/
			if(request.session.accountId){
				movieRepository.getUsersWatchlist(request.session.accountId, callback)
			} else {
				callback(['Please log in to view this page.'], null)
			}
		},
		
		watchlist: function(request, titleId, callback){
			// TODO: Check if user logged in
			// TODO ERROR HANDLING
			if(request.session.accountId){
				const accountId = request.session.accountId
				//Check if already favourited
				movieRepository.checkIfWatchlisted(accountId, titleId, function(errors, results){
					//console.log(results)
					if(errors.length > 0){
						//error
						console.log(errors)
					} else {
						if(results.length > 0){
							// Remove from favourites
							//console.log("already on favourites")
							movieRepository.deleteUserWatchlist(accountId, titleId, callback)
						} else {
							// Add to favourites
							//Get current time
							const date = new Date().toJSON().slice(0, 10)
							//console.log("added to favourites")
							movieRepository.createUserWatchlist(accountId, titleId, date, callback)
						}
					}
				})
			} else {
				callback(['Please log in to view this page'], null)
			}
			
		},

		/* ************************************ PUBLIC REVIEWS ************************************** */

		createPublicReview: function(review, titleId, callback){
			movieRepository.createPublicReview(review, titleId, callback)
		},

		getPublicReviewById: function(reviewId, callback){
			movieRepository.getPublicReviewById(reviewId, callback)
		},

		getReviewsByTitleId: function(titleId, callback){
			movieRepository.getReviewsByTitleId(titleId, callback)
		},

		getAllPublicReviews: function(callback){
			movieRepository.getAllPublicReviews(callback)
		}
	}
}
