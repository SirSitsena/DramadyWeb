const express = require('express')
const bcrypt = require('bcrypt')

module.exports = function({accountManager}){
	const router = express.Router()

	router.use(express.urlencoded({
		extended: false
	}))


	/*

	Every user is identified by a user id. (userId)

	*/

	// Show form when signing up
	router.get("/sign-up", function(request, response){
		response.render("accounts-sign-up.hbs")
	})
	//What to do when form is POSTED
	router.post('/sign-up', function(request, response){
		let account = {}
		account.username = request.body.username
		account.password = request.body.password
		account.fullname = request.body.fullname

		accountManager.createAccount(account, function(errors, accountId) {
			const model = {
				errors: errors,
				accountId: accountId
			}
			response.render('accounts-sign-up.hbs', model) 
		})
	})


	// Show the form of signing in:
	router.get("/sign-in", function(request, response){
		response.render("accounts-sign-in.hbs")
	})
	// Post the form.
	router.post("/sign-in", function(request, response) {
		let account = {}
		account.username = request.body.username
		account.password = request.body.password

		accountManager.signIn(account, function(errors, account) {
			var message
			if(account != null){
				message = "Logged in"
				request.session.accountId = account.id
			}
			const model = {
				errors: errors,
				message: message
			}
			response.render("accounts-sign-in.hbs", model)
		})
	})

	//Signing out of an account
	router.post('/sign-out', function(request, response) {
		accountManager.signOut(request, function(errors, message) {
			const model = {
				errors: errors,
				message: message
			}
			response.render('accounts-sign-out.hbs', model)
		})
	})

	router.get("/", function(request, response){
		accountManager.getAllAccounts(function(errors, accounts){
			const model = {
				errors: errors,
				accounts: accounts
			}
			for(var account of accounts){
				console.log(account.password)
				bcrypt.hash(account.password, 10, function(error, hash){
					console.log(hash)
					console.log(hash.length)
				})
			}
			response.render("accounts-list-all.hbs", model)
		})
	})

	router.get('/:username', function(request, response){
		
		const username = request.params.username
		
		accountManager.getAccountByUsername(username, function(errors, account){
			const model = {
				errors: errors,
				account: account
			}
			response.render("accounts-show-one.hbs", model)
		})
		
	})

	return router
}





//module.exports = router