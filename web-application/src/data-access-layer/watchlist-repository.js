module.exports = function({db}) {
    return {
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
        }
    }
}