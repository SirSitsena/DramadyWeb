module.exports = function({db}){
	return {
		/*
			Retrieves all accounts ordered by username.
			Possible errors: databaseError
			Success value: The fetched accounts in an array.
		*/
		getAllAccounts: function(callback){
			const query = 'SELECT * FROM accounts ORDER BY username'
			const values = []
			
			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts)
				}
			})
		},

		/*
			Retrieves the account with the given username.
			Possible errors: databaseError
			Success value: The fetched account, or null if no account has that username.
		*/
		getAccountByUsername: function(username, callback){
			const query = 'SELECT * FROM accounts WHERE username = ? LIMIT 1'
			const values = [username]
			
			db.query(query, values, function(error, accounts){
				if(error || accounts.length != 1){
					callback(['databaseError'], null)
				}else{
					if(accounts[0].isPublic == 1){
						accounts[0].isPublic = true
					} else {
						accounts[0].isPublic = false
					}
					callback([], accounts[0])
				}
			})
		},

		/*
			Creates a new account.
			account: {username: "The username", password: "The password"}
			Possible errors: databaseError, usernameTaken
			Success value: The id of the new account.
		*/
		createAccount: function(account, callback){
			const firstQuery = 'SELECT * FROM accounts WHERE username = ?'
			const firstValues = [account.username]

			db.query(firstQuery, firstValues, function(error, foundAccounts){
				if(error){
					callback(['databaseError'], null)
				} else if (foundAccounts.length > 0){
					callback(['User with that username already exists. Please try another username'])
				} else {
					var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
					const secondQuery = 'INSERT INTO accounts (username, hash, isPublic, createdAt) VALUES (?, ?, ?, ?)'
					const secondValues = [account.username, account.hash, 0, date]
					db.query(secondQuery, secondValues, function(error, insertedRow){
						if(error){
							callback(['databaseError'], null)
						}else{
							callback([], insertedRow.insertId)
						}
					})
				}
			})
		},

		getPrivacy: function(accountId, callback){
			const query = 'SELECT * FROM accounts WHERE id = ?'
			const values = [accountId]

			db.query(query, values, function(error, accounts){
				if(error){
					callback(['databaseError'], null)
				} else {
					if(accounts[0].isPublic == 1){
						accounts[0].isPublic = true
					} else {
						accounts[0].isPublic = false
					}
					callback([], accounts[0])
				}
			})
		},

		makePublic: function(accountId, callback){
			var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
			const query = 'UPDATE accounts SET isPublic = ?, updatedAt = ? WHERE id = ?'
			const values = [1, date, accountId]
			db.query(query, values, function(error, result){
				if(error){
					callback(['databaseError'], null)
				} else {
					callback([], null)
				}
			})
		},

		makePrivate: function(accountId, callback){
			var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
			const query = 'UPDATE accounts SET isPublic = ?, updatedAt = ? WHERE id = ?'
			const values = [0, date, accountId]

			db.query(query, values, function(error, result){
				if(error){
					callback(['databaseError'], null)
				} else {
					callback([], null)
				}
			})
		},

		/*
			Log in to an account
		*/
		signIn: function(account, callback) {
			const query = 'SELECT * FROM accounts WHERE username = ?'
			const values = [account.username]

			db.query(query, values, function(error, accounts) {
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], accounts[0])
				}
			})
		}
	}
}

