const path = require('path')
const express = require('express')

module.exports = function({moviesRouterRESTAPI}){
	const api = express()
	// Start listening for incoming HTTP requests!
/*
	api.use('/', function(request, response){
		console.log('received request')
		response.status(200).end()
	})*/


	api.use('/reviews', moviesRouterRESTAPI)

	api.listen(9000, function(){
		console.log('Running api on 9000!')
	})

	return api
}

