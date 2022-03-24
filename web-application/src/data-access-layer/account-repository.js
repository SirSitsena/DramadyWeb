module.exports = function({models}){
	return {
		/*
			Retrieves all accounts ordered by username.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllAccounts: function(callback){
			models.Accounts.findAll({
				order: ["username"]
			}).then(function(accounts){
				callback([], accounts)
			}).catch(function(error){
				callback(['databaseError'], null)
			})
		},

		/*
			Retrieves the account with the given username.
			Possible errors: databaseError
			Success value: The fetched account, or null if no account has that username.
		*/
		getAccountByUsername: function(username, callback){
			models.Accounts.findOne({
				where: {
					username: username
				}
			}).then(function(account){
				callback([], account)
			}).catch(function(error){
				
				console.log("errors: ", error)
				callback(['databaseError'], null)
			})
		},

		/*
			Creates a new account.
			account: {username: "The username", password: "The password"}
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createAccount: function(account, callback){
			models.Accounts.findAll({
				where: {
					username: account.username
				}
			}).then(function(accs){
				if(accs.length > 0){
					callback(["User with that username already exists."], null)
				} else {
					models.Accounts.create({
						username: account.username,
						hash: account.hash,
						isPublic: false
					}).then(function(account){
						callback([], account.id)
					}).catch(function(error){
						callback(['databaseError'], null)
					})
				}
			}).catch(function(error){
				callback(['databaseError'], null)
			})
			
		},
		getPrivacy: function(accountId, callback){
			models.Accounts.findOne({
				attributes: ['isPublic'],
				where: {
					id: accountId
				}
			}).then(function(account){
				callback([], account)
			}).catch(function(errors){
				callback(['databaseError'], null)
			})
		},
		makePublic: function(accountId, callback){
			models.Accounts.update({
				isPublic: true
			}, {
				where: {
					id: accountId
				}
			}).then(function(result){
				callback([], null)
			}).catch(function(errors){
				callback(['databaseError'], null)
			})
		},
		makePrivate: function(accountId, callback){
			models.Accounts.update({
				isPublic: false
			}, {
				where: {
					id: accountId
				}
			}).then(function(result){
				callback([], null)
			}).catch(function(errors){
				callback(['databaseError'], null)
			})
		},

		/*
			Log in to an account
		*/
		signIn: function(account, callback) {
			models.Accounts.findOne({
				where: {
					username: account.username
				}
			}).then(function(account){
				callback([], account)
			}).catch(function(error){
				callback(['databaseError'], null)
			})
		}
	}
}

