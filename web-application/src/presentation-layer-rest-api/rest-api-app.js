//const path = require('path')
const express = require('express')
// const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
// const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"

module.exports = function({moviesRouterRESTAPI, reviewsRouterRESTAPI, accountsRouterRESTAPI}){
	const api = express()

	api.use(function(request, response, next){
		// response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
		response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

		// Request methods you wish to allow
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		response.setHeader('Access-Control-Allow-Credentials', true);
		next()
	})

	api.use(express.json())
	api.use(express.urlencoded({
		extended: false,
	}))

	api.use(cookieParser())

	api.use('/movies', moviesRouterRESTAPI)
	api.use('/reviews', reviewsRouterRESTAPI)
	api.use('/accounts', accountsRouterRESTAPI)
	

	return api
}

