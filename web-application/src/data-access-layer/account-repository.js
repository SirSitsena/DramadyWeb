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
			models.Accounts.create({
				username: account.username,
				hash: account.hash
			}).then(function(account){
				callback([], account.id)
			}).catch(function(error){
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

