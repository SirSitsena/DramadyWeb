const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

/* 									CREATING AN ACCOUNT											*/
exports.createAccount = function(account, callback){	
	// Validate the account.
	const errors = accountValidator.getErrorsNewAccount(account)
	
	if(0 < errors.length){
		callback(errors, null)
		return
	}
	
	accountRepository.createAccount(account, callback)
}

/*									SIGNING IN TO AN ACCOUNT									*/
exports.signIn = function(account, request, callback){
	//accountRepository.signIn(account, callback)
	accountRepository.signIn(account, function(errors, result){
		if(result.length > 0) {
			//request.session.loggedIn = true
			request.session.accountId = result[0].id
			console.log(request.session.accountId)
			callback(errors, result)
		} else {
			if(errors.length > 0){
				callback(errors, [])
			} else {
				callback(["No user found"], [])
			}
		}
		//callback(errors, result)
	})
}


exports.getAccountByUsername = function(username, callback){
	accountRepository.getAccountByUsername(username, callback)
}