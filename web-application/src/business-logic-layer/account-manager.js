const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports = function({accountRepository, accountValidator, favouritesRepository, watchlistRepository}){
	
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
	/* 				SWITCHING THE PRIVACY SETTING ON A USERS FAVOURITES AND WATCHLIST				 */
		switchPrivacy: function(accountId, callback){
			accountRepository.getPrivacy(accountId, function(errors, result){
				if(errors.length > 0){
					callback(errors, null)
				} else {
					let isPublic = result.dataValues.isPublic
					if(isPublic == true){
						accountRepository.makePrivate(accountId, callback)
					} else if (isPublic == false) {
						accountRepository.makePublic(accountId, callback)
					} else {
						callback(["Internal server error"], null)
					}
				}
			})
		},
	/*									SIGNING IN TO AN ACCOUNT									*/
		signIn: function(account, callback){
			accountRepository.signIn(account, function(errors, result){
				if(result != null) {
					let acc = result.dataValues
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
			accountRepository.getAccountByUsername(username, function(errors, account){
				if(errors.length > 0){
					callback(errors, null)
				} else {
					if (account != null){
						let accountId = account.dataValues.id
						if(account.dataValues.isPublic == true){
							// Fetch the user's favourites and watchlist.
							favouritesRepository.getUsersFavourites(accountId, function(errors, favourites){
								if(errors.length > 0){
									callback(errors, account)
								} else {
									watchlistRepository.getUsersWatchlist(accountId, function(errors, watchlist){
										if(errors.length > 0){
											callback(errors, account)
										} else {
											account.watchlist = watchlist
											account.favourites = favourites
											callback([], account)
										}
									})
								}
							})
						} else {
							callback([], account)
						}

					} else {
						callback(["databaseError"], null)
					}
				}
			})
		}
	}
}