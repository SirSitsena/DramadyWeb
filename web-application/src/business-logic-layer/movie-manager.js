//const movieRepository = require('../data-access-layer/movie-repository')
// const movieValidator = require('./movie-validator')

module.exports = function({movieRepository}){
	return {
		getAllMovies: function(callback){
			movieRepository.getAllMovies(callback)
		},
		
		/* 						FAVOURITES FUNCTIONALITY 					*/
		
		viewFavourites: function(accountId, callback){
			/*
				Viewing an accounts favourites list.
			*/
		},
		
		createFavourite: function(movieId, callback){
			// get current date
			const date = new Date().toJSON().slice(0, 10)
			/*
				TODO: GET CURRENT USER ID, CHECK IF LOGGED IN.
			*/
		
			movieRepository.createUserFavourites(userId, movieId, date, callback)
		},
		
		deleteFavourite: function(movieId, callback){
			/*
				Delete from favourites list : TODO
			*/
		},
		
		/*						 WATCHLIST FUNCTIONALITY						*/
		
		viewWatchlist: function(accountId, callback){
			/*
				Viewing an accounts watchlist.
			*/
		},
		
		createWatchlistItem: function(movieId, callback){
			/*
				Add to watchlist : TODO
			*/
		},
		
		deleteWatchlistItem: function(movieId, callback){
			/*
				Remove from watchlist : TODO
			*/
		}
	}
}