//const accountRepository = require('../data-access-layer/account-repository')
//const accountValidator = require('./account-validator')

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
			
			accountRepository.createAccount(account, callback)
		},
	/*									SIGNING IN TO AN ACCOUNT									*/
		signIn: function(account, request, callback){
			accountRepository.signIn(account, function(errors, result){
				if(result.length > 0) {
					request.session.accountId = result[0].id
					callback(errors, result)
				} else {
					if(errors.length > 0){
						callback(errors, [])
					} else {
						callback(["Username or Password incorrect"], [])
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