//const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"

module.exports = function({moviesRouterRESTAPI, reviewsRouterRESTAPI, accountManager}){
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

	api.use(express.json())
	api.use(express.urlencoded({
		extended: false,
	}))
	api.use(cookieParser())
	api.use('/movies', moviesRouterRESTAPI)
	api.use('/reviews', reviewsRouterRESTAPI)

	api.post('/sign-up', function(request, response) {
		const account = {}
		account.username = request.body.username
		account.fullname = request.body.fullname
		account.password = request.body.password

		accountManager.createAccount(account, function(errors, accountId) {
			if(errors.length > 0){
				response.status(500).json({error: "account couldn't be created due to unknown error."})
			} else {
				accountManager.signIn(account, function(errors, accountId){
					if(errors.length > 0){
						response.status(500).json({errors: errors})
					} else {
						const payload = {
							isLoggedIn: true,
							accountId: accountId
						}
						jwt.sign(payload, secret , {expiresIn: (1000*60*60).toString()+'ms' },function(error, token) {
							if(error){
								//Error
							} else {
								response.cookie('token', token, {maxAge: 1000*60*60}).status(200).json({test:"signed in" , isLoggedIn: true})
							}
						})
					}
				})
			}
		})
	})

	api.post('/tokens', function(request, response){
		const grant_type = request.body.grant_type
		const account = {}
		account.username = request.body.username
		account.password = request.body.password
		if(grant_type == "password"){
			accountManager.signIn(account, function(errors, accountId){
				if(accountId != null){
					const payload = {
						isLoggedIn: true,
						accountId: accountId
					}

					jwt.sign(payload, secret , {expiresIn: (1000*60*60).toString()+'ms' },function(error, token) {
						if(error){
							//ERROR
						} else {
							response.cookie('token', token, {maxAge: 1000*60*60}).status(200).json({test:"signed in" , isLoggedIn: true})
						}
					})
				} else {
					// SEND CORRECT RESPONE ACCORDING TO AUTH2.0
					response.status(400).end()
				}
			})
		} else {
			//grant type wrong
			// SEND CORRECT RESPONE ACCORDING TO AUTH2.0
			console.log("grant")
			response.status(400).json({
				error: "invalid_grant"
			})
		}

	})

	api.post('/sign-out', function(request, response){
		response.clearCookie('token').status(200).json({message: "Signed out"})
	})

	// api.listen(9000, function(){
	// 	console.log('Running api on 9000!')
	// })

	return api
}

