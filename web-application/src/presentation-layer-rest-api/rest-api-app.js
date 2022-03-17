//const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"

module.exports = function({moviesRouterRESTAPI, reviewsRouterRESTAPI, accountManager}){

	const api = express()
	api.use(express.json())
	api.use(express.urlencoded({
		extended: false,
	}))

	api.use('/movies', moviesRouterRESTAPI)
	api.use('/reviews', reviewsRouterRESTAPI)

	api.post('/tokens', function(request, response){
		const grant_type = request.body.grant_type
		const account = {}
		account.username = request.body.username
		account.password = request.body.password
		console.log(grant_type)
		if(grant_type == "password"){
			accountManager.signIn(account, function(errors, accountId){
				if(accountId != null){
					const payload = {
						isLoggedIn: true,
						accountId: accountId
					}

					jwt.sign(payload, secret , function(error, token) {
						response.status(200).json({
							"access_token": token
						})
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

	// api.listen(9000, function(){
	// 	console.log('Running api on 9000!')
	// })

	return api
}

