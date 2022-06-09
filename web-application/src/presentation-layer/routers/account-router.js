const express = require('express');

var csrf = require('csurf');
var csrfProtection = csrf();



module.exports = function({accountManager}){
	const router = express.Router()

	router.use(express.urlencoded({
		extended: false
	}))

	router.use(csrfProtection);

	// Show form when signing up
	router.get("/sign-up", function(request, response){
		response.render("accounts-sign-up.hbs", {csrfToken:request.csrfToken})
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
		response.render("accounts-sign-in.hbs", {csrfToken:request.csrfToken} )
	})
	// Post the form.
	router.post("/sign-in", function(request, response) {
		let account = {}
		account.username = request.body.username
		account.password = request.body.password
		accountManager.signIn(account, function(errors, accountId) {
			var message
			if(accountId != null){
				message = "Logged in"
				request.session.accountId = accountId
				request.session.username = account.username
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
		if(request.session.accountId != null){
			delete request.session.accountId
			delete request.session.username
			request.session.destroy(function(error){
				if(error) {
					const model = {
						errors: ["Error logging out."]
					}
					response.render('accounts-sign-out.hbs', model)
				} else {
					const model = {
						message: ["Logged out of the account."]
					}
					response.render('accounts-sign-out.hbs', model)
				}
			})
		} else {
			const model = {
				errors: ["Not logged in to any account."]
			}
			response.render('accounts-sign-out.hbs', model)
		}
	})

	router.get('/sign-out', function(request, response ){
		const accountId = request.session.accountId
		const model = {
			accountId: accountId,
			csrfToken:request.csrfToken
		}
		response.render("accounts-sign-out.hbs", model)
	})

	router.get('/:username', function(request, response){

		const username = request.params.username

		accountManager.getAccountByUsername(username, function(errors, account){
			if(errors.length == 0 && account != null){
				if(account.id == request.session.accountId){
					account.isOwner = true
				}
			}
			const model = {
				errors: errors,
				account: account,
				csrfToken:request.csrfToken
			}
			response.render("accounts-show-one.hbs", model)
		})

	})

	router.post("/privacy", function(request, response){
		accountManager.switchPrivacy(request.session.accountId, function(errors, result){
			response.redirect("back")
		})
	})

	return router
}