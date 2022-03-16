//const path = require('path')
const express = require('express')

module.exports = function({moviesRouterRESTAPI, reviewsRouterRESTAPI}){
	const api = express()

	/*
	api.use('/', function(request, response){
		console.log('received request')
		response.status(200).end()
	})*/

	api.use(function(request, response, next){
		response.setHeader("Access-Control-Allow-Origin", "*")
		response.setHeader("Access-Control-Allow-Methods", "*")
		response.setHeader("Access-Control-Allow-Headers", "*")
		response.setHeader("Access-Control-Expose-Headers", "*")
		next()
	})


	api.use('/movies', moviesRouterRESTAPI)
	api.use('/reviews', reviewsRouterRESTAPI)

	// api.listen(9000, function(){
	// 	console.log('Running api on 9000!')
	// })

	return api
}

