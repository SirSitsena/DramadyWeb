//const accountRepository = require('../data-access-layer/account-repository')
//const accountValidator = require('./account-validator')
const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports = function({accountRepository, accountValidator}){
	
	return {
		getAllAccounts: function(callback){
			accountRepository.getAllAccounts(callback)
		},
		
	/* 									CREATING AN ACCOUNT											*/
		createAccount: function(account, callback){	
			// Validate the account.
			const errors = accountValidator.getErrorsNewAccount(account)
			
			if(0 < errors.length){
				callback(errors, null)
				return
			}
			bcrypt.hash(account.password, saltRounds, function(error, hash){
				if(error){
					callback(["Internal server error"], null)
				} else {
					account.hash = hash
					accountRepository.createAccount(account, callback)
				}
			})
		},
	/*									SIGNING IN TO AN ACCOUNT									*/
		signIn: function(account, callback){
			accountRepository.signIn(account, function(errors, result){
				if(result.length > 0) {
					let acc = result[0]
					bcrypt.compare(account.password, acc.hash, function(error, result) {
						if(error){
							callback(["Internal unexplained server error."], null)
						} else {
							if(result == true){
								callback([], acc.id)
							} else {
								callback(["Password incorrect for user [" + acc.username + "]"])
							}
						}
						
					})
				} else {
					if(errors.length > 0){
						callback(errors, null)
					} else {
						callback(["User not found"], null)
					}
				}
			})
		},
	/*									SIGNING OUT OF AN ACCOUNT									*/
		signOut: function(request, callback) {
			if(request.session.accountId != null){
				delete request.session.accountId
				request.session.destroy(function(error) {
					if(error){
						callback(error)
					} else {
						callback([], ["Logged out of the account."])
					}
				})
			} else {
				callback(['Not logged in to any account.'], [])
			}
		},

		getAccountByUsername: function(username, callback){
			accountRepository.getAccountByUsername(username, callback)
		}
	}
}