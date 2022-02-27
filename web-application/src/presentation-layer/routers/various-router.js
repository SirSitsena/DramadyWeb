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
router.get("/extraFeatures", function(request, response){
	response.render("deadline.hbs")
})



module.exports = router