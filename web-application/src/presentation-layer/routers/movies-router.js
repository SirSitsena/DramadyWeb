const express = require('express')
//const movieManager = require('../../business-logic-layer/movie-manager')
const imdbMovieManager = require('../../business-logic-layer/imdbApi-manager')

module.exports = function({movieManager}){
	const router = express.Router()
	// Make the session avaliable in views:
	router.use(function(request, response, next) {
		response.locals.session = request.session
		next()
	})

	router.get("/top250", function(request, response){
		movieManager.getAllMovies(request, function(errors, top250Movies){
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
	
	/*
	router.get('/:titleId', function(request, response){
		movieManager.getMovieByTitleId(request.params.titleId, function(errors, movie){
			const model = {
				errors: errors,
				movie: movie
			}
			response.render('movie.hbs', model)
		})
	})*/

	router.get('/favourites', function(request, response){
		//TODO
		movieManager.viewFavourites(request, function(errors, movies){
			const model = {
				errors: errors,
				movies: movies
			}
			response.render('favourites.hbs', model)
		})
	})

	router.get('/favourite/:titleId', function(request, response){
		const titleId = request.params.titleId
		movieManager.favourite(request, titleId, function(errors, results){
			if(errors.length == 0){
				response.redirect('back')
			} else {
				//ERROR
			}
		})
	})

	router.get('/watchlist', function(request, response){
		movieManager.viewWatchlist(request, function(errors, movies){
			const model = {
				errors: errors,
				movies: movies
			}
			response.render('watchlist.hbs', model)
		})
	})

	router.get('/watchlist/:titleId', function(request, response){
		const title = request.params.titleId
		movieManager.watchlist(request, titleId, function(errors, results){
			if(errors.length == 0){
				response.redirect('back')
			} else {
				//ERROR
			}
		})
	})
	
	return router
}