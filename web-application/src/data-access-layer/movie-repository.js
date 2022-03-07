const db = require('./db')
const request = require('request')
const API_KEY_1 = "k_9t0l0iej"

module.exports = function({}){
	return {
		/*
			Retrieves the movie with the given id.
			Possible errors: databaseError
			Success value: The fetched movie, or null if no movie has that id.
		*/
		getMovieById: function(id, callback){
			
			const query = `SELECT * FROM top250Movies WHERE id = ? LIMIT 1`
			const values = [id]
			
			db.query(query, values, function(error, movies){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], movies[0])
				}
			})
			
		},
		/*
			Gets a movie from the API using its title id.
		*/
		getMovieByTitleId: function(titleId, callback){
			console.log(titleId)
			request('https://imdb-api.com/en/API/Title/'+API_KEY_1+'/'+titleId, { json:true }, (err, res, body) => {

			// TODOO:
				//console.log("test1")
				//const movie = JSON.parse(body)
				console.log(body.fullTitle);
				if(err || body.errorMessage != ""){
					console.log(body.errorMessage, "test2")
					callback(err, null)
				} else {
					console.log("test3")
					console.log(body.items)
					callback(null, body.items)
				}
			})
		},

		/*
			Retrieves all movies ordered by rank.
			Possible errors: databaseError
			Success value: The fetched movies in an array.
		*/
		getAllMovies: function(callback){
			
			const query = `SELECT * FROM top250Movies ORDER BY rank`
			const values = []
			
			db.query(query, values, function(error, movies){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], movies)
				}
			})
			
		},

		/*
			Retrieves the movie with the given rank.
			Possible errors: databaseError
			Success value: The fetched movie, or null if no movie has that rank.
		*/
		getMovieById: function(rank, callback){
			
			const query = `SELECT * FROM top250Movies WHERE rank = ? LIMIT 1`
			const values = [rank]
			
			db.query(query, values, function(error, movies){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], movies[0])
				}
			})
			
		},


		/*
			Retrieves the movie with the given year.
			Possible errors: databaseError
			Success value: The fetched movie, or null if no movie has that year.
		*/
		getMovieById: function(year, callback){
			
			const query = `SELECT * FROM top250Movies WHERE year = ?`
			const values = [year]
			
			db.query(query, values, function(error, movies){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], movies)
				}
			})
			
		},


		/*
			Retrieves the movie with the given year.
			Possible errors: databaseError
			Success value: The fetched movie, or null if no movie has that year.
		*/
		getMovieById: function(year, callback){
			
			const query = `SELECT * FROM top250Movies WHERE year = ?`
			const values = [year]
			
			db.query(query, values, function(error, movies){
				if(error){
					callback(['databaseError'], null)
				}else{
					callback([], movies)
				}
			})
			
		},


		/* **************************** FAVOURITES ********************* */
		getUsersFavourites: function(userId, callback){
			const query = "SELECT * FROM UserFavourites WHERE userId = ?"
			const values = [userId]

			db.query(query, values, function(errors, results){
				if(errors){
					callback(['databaseError'], null)
				} else {
					callback([], results)
				}
			})
		},


		/* 
			Add a record to favourites list.

			SUCCESS: RETURNS ID OF FAVOURITE.
		*/
		createUserFavourites: function(userId, movieId, date, callback) {
			
			const query = 'INSERT INTO UserFavourites (dateAdded, userId, movieId) VALUES (?, ?, ?)'
			const values = [date, userId, movieId]

			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					console.log(error)
					callback(['databaseError'], null)
				}else{
					console.log(results.insertId)
					callback([], results.insertId)
				}
			})
		},

		/*
			Delete a record from the favourites list.

			SUCCESS: RETURNS (1) DELETED ROW
		*/
		deleteUserFavourite: function(userId, movieId, callback) {
			const query = 'DELETE FROM UserFavourites WHERE userId = ? AND movieId = ?'
			const values = [userId, movieId]

			db.query(query, values, function(error, results){
				if(error){
					//TODO: LOOK FOR ERRORS :
					callback(['databaseError'], null)
				}else{
					callback([], results.affectedRows)
				}
			})
		},

		/*
			Checks if a user has a specific titleId (Movie) favourited

			SUCCESS: Returns rows, if length 0 no favourites, if length > 0 it is favourited.
		*/

		checkIfFavourited: function(userId, titleId, callback){
			const query = 'SELECT * FROM UserFavourites WHERE userId = ? AND movieId = ?'
			const values = [userId, titleId]

			db.query(query, values, function(error, results){
				if(error){
					callback(['databaseError'], null)
				} else {
					callback([], results)
				}
			})
		},

		/* ************************* WATCHLIST ************************** */
		
		getUsersWatchlist: function(userId, callback){
			const query = "SELECT * FROM UserWatchlist WHERE userId = ?"
			const values = [userId]

			db.query(query, values, function(errors, results){
				if(errors){
					callback(['databaseError'], null)
				} else {
					callback([], results)
				}
			})
		},

		/* 
			Add a record to watchlist.

			SUCCESS: RETURNS ID OF watchlist item.
		*/
		createUserWatchlist: function(userId, movieId, date, callback) {
			
			const query = 'INSERT INTO UserWatchlist (dateAdded, userId, movieId) VALUES (?, ?, ?)'
			const values = [date, userId, movieId]

			db.query(query, values, function(error, results){
				if(error){
					// TODO: Look for usernameUnique violation.
					callback(['databaseError'], null)
				}else{
					callback([], results.insertId)
				}
			})
		},

		/*
			Delete a record from the watchlist.

			SUCCESS: RETURNS (1) DELETED ROW
		*/
		deleteUserWatchlist: function(userId, movieId, callback) {
			const query = 'DELETE FROM UserWatchlist WHERE userId = ? AND movieId = ?'
			const values = [userId, movieId]

			db.query(query, values, function(error, results){
				if(error){
					//TODO: LOOK FOR ERRORS :
					callback(['databaseError'], null)
				}else{
					callback([], results.affectedRows)
				}
			})
		},
		
		checkIfWatchlisted: function(userId, titleId, callback){
			const query = 'SELECT * FROM UserWatchlist WHERE userId = ? AND movieId = ?'
			const values = [userId, titleId]

			db.query(query, values, function(error, results){
				if(error){
					callback(['databaseError'], null)
				} else {
					callback([], results)
				}
			})
		},

		
	}
}
