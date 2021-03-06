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
	


	router.get('/favourites', function(request, response){
		const accountId = request.session.accountId
		movieManager.viewFavourites(accountId, function(errors, movies){
			const model = {
				errors: errors,
				movies: movies
			}
			response.render('favourites.hbs', model)
		})
	})

	router.get('/favourite/:movieId/:movieTitle', function(request, response){
		const movieId = request.params.movieId
		const movieTitle = request.params.movieTitle
		const accountId = request.session.accountId
		if(accountId != null){
			movieManager.favourite(accountId, movieId, movieTitle, function(errors, results){
				if(errors.length == 0){
					response.redirect('back')
				} else {
					response.status(500).json({
						error: "couldn't add to favourites"
					})
				}
			})
		} else {
			response.status(401).end()
		}
	})

	router.get('/watchlist', function(request, response){
		const accountId = request.session.accountId
		movieManager.viewWatchlist(accountId, function(errors, movies){
			const model = {
				errors: errors,
				movies: movies
			}
			response.render('watchlist.hbs', model)
		})
	})

	router.get('/watchlist/:movieId/:movieTitle', function(request, response){
		const movieId = request.params.movieId
		const movieTitle = request.params.movieTitle
		const accountId = request.session.accountId
		if(accountId != null){
			movieManager.watchlist(accountId, movieId, movieTitle, function(errors, results){
				if(errors.length == 0 || errors == null){
					response.redirect('back')
				} else {
					response.status(500).json({
						error: "couldn't add to watchlist"
					})
				}
			})
		} else {
			response.status(401).end()
		}
	})
	
	router.get('/search', function(request, response){
		var url = require("url")
		let urlParts = url.parse(request.url)
		const query = decodeURI(urlParts.query)
		let string = query.split('=')
		const keywords = string[1].replace('+', ' ')
		
		const accountId = request.session.accountId

		apiManager.getSearchMovieByTitle(accountId, keywords, function(error, result) {
			if(error.length > 0){
			} else {
				const model = {
					movies: result.results
				}
				response.render('home.hbs', model)
			}
		})
	})

	router.get('/review/create/:movieId', function(request, response){
		if(request.session.accountId){
			const model = {
				movieId: movieId,
				csrfToken: request.csrfToken
			}
		} else {
			const model = {
				errors: ["Must be logged in to view this page"]
			}
			response.render('review-create.hbs', model)
		}
	})

	router.post('/review/', function(request, response){
		if(request.session.accountId){
			const accountId = request.session.accountId
			const review = request.body.review
			const movieId = request.body.movieId
			movieManager.createReview(accountId, review, movieId, function(errors, reviewId){
				if(errors.length > 0){
					const model = {
						errors: errors
					}
					response.render('review-create.hbs', model)
				} else {
					response.redirect('/')
				}
			})
		} else {
			const model = {
				errors: ["Must be logged in to view this page"]
			}
			response.render('review-create.hbs', model)
		}
	})

	return router
}