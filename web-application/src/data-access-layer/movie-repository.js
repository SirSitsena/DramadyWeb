const db = require('./db')

/*
	Retrieves the movie with the given id.
	Possible errors: databaseError
	Success value: The fetched movie, or null if no movie has that id.
*/
exports.getMovieById = function(id, callback){
	
	const query = `SELECT * FROM top250Movies WHERE id = ? LIMIT 1`
	const values = [id]
	
	db.query(query, values, function(error, movies){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], movies[0])
		}
	})
	
}

/*
	Retrieves all movies ordered by rank.
	Possible errors: databaseError
	Success value: The fetched movies in an array.
*/
exports.getAllMovies = function(callback){
	
	const query = `SELECT * FROM top250Movies ORDER BY rank`
	const values = []
	
	db.query(query, values, function(error, movies){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], movies)
		}
	})
	
}

/*
	Retrieves the movie with the given rank.
	Possible errors: databaseError
	Success value: The fetched movie, or null if no movie has that rank.
*/
exports.getMovieById = function(rank, callback){
	
	const query = `SELECT * FROM top250Movies WHERE rank = ? LIMIT 1`
	const values = [rank]
	
	db.query(query, values, function(error, movies){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], movies[0])
		}
	})
	
}


/*
	Retrieves the movie with the given year.
	Possible errors: databaseError
	Success value: The fetched movie, or null if no movie has that year.
*/
exports.getMovieById = function(year, callback){
	
	const query = `SELECT * FROM top250Movies WHERE year = ?`
	const values = [year]
	
	db.query(query, values, function(error, movies){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], movies)
		}
	})
	
}


/*
	Retrieves the movie with the given year.
	Possible errors: databaseError
	Success value: The fetched movie, or null if no movie has that year.
*/
exports.getMovieById = function(year, callback){
	
	const query = `SELECT * FROM top250Movies WHERE year = ?`
	const values = [year]
	
	db.query(query, values, function(error, movies){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], movies)
		}
	})
	
}