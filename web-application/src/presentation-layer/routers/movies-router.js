const express = require('express')
//const movieManager = require('../../business-logic-layer/movie-manager')
const imdbMovieManager = require('../../business-logic-layer/imdbApi-manager')

module.exports = function({movieManager}){
	const router = express.Router()

	router.get("/top250", function(request, response){
		console.log("It is Working Main")
		movieManager.getAllMovies(function(errors, top250Movies){
			const model = {
				errors: errors,
				movies: top250Movies
			}
			response.render("top250.hbs", model)
		})
	
	})
	
	router.get("/trendingMovies", function(request, response){
		imdbMovieManager.getMostPopularMovies(function(errors, trendingMovies){
			const model = {
				errors: errors,
				movies: trendingMovies
			}
			response.render("trendingMovies.hbs", model)
		})
	
	})
	
	router.get('/favourites', function(request, response){
		//TODO
		
	})
	
	router.get('/watchlist', function(request, response){
		//TODO
	})
	
	return router
}

