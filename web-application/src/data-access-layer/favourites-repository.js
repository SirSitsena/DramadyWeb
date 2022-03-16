module.exports = function({db}){
    return{
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
        createUserFavourites: function(userId, movieId,movieTitle, date, callback) {

            const query = 'INSERT INTO UserFavourites (dateAdded, userId, movieId, movieTitle) VALUES (?, ?, ?, ?)'
            const values = [date, userId, movieId, movieTitle]

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
        }
    }
}