const movieRepository = require('../data-access-layer/movie-repository')
// const movieValidator = require('./movie-validator')

exports.getAllMovies = function(callback){
	movieRepository.getAllMovies(callback)
}


