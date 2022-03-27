const express = require('express');

var csrf = require('csurf');
const {NULL} = require("mysql/lib/protocol/constants/types");

var csrfProtection = csrf();



module.exports = function({accountManager}){
	const router = express.Router()

	router.use(express.urlencoded({
		extended: false
	}))

	router.use(csrfProtection);
	/*

	Every user is identified by a user id. (userId)

	*/

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
		accountManager.signOut(request, function(errors, message) {
			const model = {
				errors: errors,
				message: message
			}
			response.render('accounts-sign-out.hbs', model)
		})
	})

	router.get('/sign-out', function(request, response ){
		const accountId = request.session.accountId
		const model = {
			accountId: accountId,
			csrfToken:request.csrfToken
		}
		response.render("accounts-sign-out.hbs", model)
	})


	router.get("/", function(request, response){
		accountManager.getAllAccounts(function(errors, accounts){
			const model = {
				errors: errors,
				accounts: accounts
			}
			console.log(model)
			console.log("model")

			response.render("accounts-list-all.hbs", model)
		})
	})

	router.get('/:username', function(request, response){

		const username = request.params.username

		accountManager.getAccountByUsername(username, function(errors, account){
			if(errors.length == 0 && account != null){
				if(account.dataValues.id == request.session.accountId){
					account.isOwner = true
				}
			}
			const model = {
				errors: errors,
				account: account,
				csrfToken:request.csrfToken
			}
			//console.log("isPublic: ", account)
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





//module.exports = router