const db = require('./db')

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
					callback(['databaseError'], null)
				}else{
					callback([], results.insertId)
				}
			})
		},

		/*
			Delete a record from the favourites list.

			SUCCESS: RETURNS (1) DELETED ROW
		*/
		deleteUserFavourite: function(id, callback) {
			const query = 'DELETE FROM UserFavourites WHERE id = ?'
			const values = [id]

			db.query(query, values, function(error, results){
				if(error){
					//TODO: LOOK FOR ERRORS :
					callback(['datanaseError'], null)
				}else{
					callback([], results.affectedRows)
				}
			})
		},

		/* ************************* WATCHLIST ************************** */

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
		deleteUserWatchlist: function(id, callback) {
			const query = 'DELETE FROM UserWatchlist WHERE id = ?'
			const values = [id]

			db.query(query, values, function(error, results){
				if(error){
					//TODO: LOOK FOR ERRORS :
					callback(['datanaseError'], null)
				}else{
					callback([], results.affectedRows)
				}
			})
		}

		
	}
}

