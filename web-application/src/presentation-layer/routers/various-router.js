const express = require('express')
const movieManager = require('../../business-logic-layer/movie-manager')
const imdbMovieManager = require('../../business-logic-layer/imdbApi-manager')
const router = express.Router()

router.get("/", function(request, response){

	response.render("home.hbs")
})


router.get("/about", function(request, response){
	response.render("about.hbs")
})

router.get("/contact", function(request, response){
	response.render("contact.hbs")
})

router.get("/top250", function(request, response){
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
//--------


module.exports = router