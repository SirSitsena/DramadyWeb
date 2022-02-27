const movieRepository = require('../data-access-layer/movie-repository')
// const movieValidator = require('./movie-validator')

exports.getAllMovies = function(callback){
	movieRepository.getAllMovies(callback)
}

exports.createFavourite = function(movieId, callback){
	// get current date
	const date = new Date().toJSON().slice(0, 10)
	/*
		TODO: GET CURRENT USER ID, CHECK IF LOGGED IN.
	*/

	movieRepository.createUserFavourites(userId, movieId, date, callback)
}
