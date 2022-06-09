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

	router.get('/favourite/:titleId/:movieTitle', function(request, response){
		const titleId = request.params.titleId
		const movieTitle = request.params.movieTitle
		const accountId = request.session.accountId
		if(accountId != null){
			movieManager.favourite(accountId, titleId, movieTitle, function(errors, results){
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

	router.get('/watchlist/:titleId/:movieTitle', function(request, response){
		const titleId = request.params.titleId
		const movieTitle = request.params.movieTitle
		const accountId = request.session.accountId
		if(accountId != null){
			movieManager.watchlist(accountId, titleId, movieTitle, function(errors, results){
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
				console.log(error)
			} else {
				const model = {
					movies: result.results
				}
				response.render('home.hbs', model)
			}
		})
	})

	router.get('/review/create/:titleId', function(request, response){
		if(request.session.accountId){
			const model = {
				titleId: titleId,
				csrfToken: request.csrfToken
			}
		} else {
			const model = {
				errors: ["Must be logged in to view this page"]
			}
			response.render('review-create.hbs', model)
		}
	})

	router.post('/review/create', function(request, response){
		if(request.session.accountId){
			const accountId = request.session.accountId
			const review = request.body.review
			const titleId = request.body.titleId
			movieManager.createPublicReview(accountId, review, titleId, function(errors, reviewId){
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

	router.get('/review/update/:titleId', function(request, response){
		if(request.session.accountId){
			
		}
	})

	return router
}