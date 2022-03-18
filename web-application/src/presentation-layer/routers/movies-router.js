const express = require('express')

module.exports = function({movieManager, apiManager}){
	const router = express.Router()
	// Make the session avaliable in views:
	router.use(function(request, response, next) {
		response.locals.session = request.session
		next()
	})

	router.get("/top250", function(request, response){
		movieManager.getAllMoviesFromTop250(request.session.accountId, function(errors, top250Movies){
			const model = {
				errors: errors,
				movies: top250Movies
			}
		response.render("top250.hbs", model)
		})
	})
	
	router.get("/trendingMovies", function(request, response){
		movieManager.getAllMoviesFromTrending(request.session.accountId, function (errors, trendingMovies){
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
		//Check if logged in
		const accountId = request.session.accountId
		movieManager.viewFavourites(accountId, function(errors, movies){
			const model = {
				errors: errors,
				movies: movies
			}
			response.render('favourites.hbs', model)
		})
	})

	router.get('/favourite/:titleId/:movieTitle', function(request, response){
		const titleId = request.params.titleId
		const movieTitle = request.params.movieTitle
		movieManager.favourite(request, titleId, movieTitle, function(errors, results){
			if(errors.length == 0){
				response.redirect('back')
			} else {
				//ERROR
			}
		})
	})

	router.get('/watchlist', function(request, response){
		//Check if logged in
		const accountId = request.session.accountId
		movieManager.viewWatchlist(accountId, function(errors, movies){
			const model = {
				errors: errors,
				movies: movies
			}
			response.render('watchlist.hbs', model)
		})
	})

	router.get('/watchlist/:titleId/:movieTitle', function(request, response){
		const titleId = request.params.titleId
		const movieTitle = request.params.movieTitle

		movieManager.watchlist(request, titleId, movieTitle, function(errors, results){
			if(errors.length == 0){
				response.redirect('back')
			} else {
				//ERROR
			}
		})
	})
	
	router.get('/search', function(request, response){
		var url = require("url")
		let urlParts = url.parse(request.url)
		const query = decodeURI(urlParts.query)
		console.log("urlParts : " + query)
		let string = query.split('=')
		const keywords = string[1].replace('+', ' ')
		console.log("keywords:" +keywords)
		
		apiManager.getSearchMovieByTitle(keywords, function(error, results) {
			//IMPROVE ERROR HANDLING

			if(error.length > 0){
				console.log(error)
			} else {
				console.log(results)
				const model = {
					movies: results.results
				}
				response.render('home.hbs', model)
			}
		})
	})

	return router
}