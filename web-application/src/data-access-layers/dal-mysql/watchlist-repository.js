module.exports = function({db}) {
    return {
        /* ************************* WATCHLIST ************************** */

        getUsersWatchlist: function(accountId, callback){
            const query = 'SELECT * FROM UserWatchlistItem WHERE accountId = ?'
            const values = [accountId]

            db.query(query, values, function(errors, watchlist){
                if(errors){
                    callback(['databaseError'], null)
                } else {
                    callback([], watchlist)
                }
            })
        },

        /*
            Add a record to watchlist.

            SUCCESS: RETURNS ID OF watchlist item.
        */
        createUserWatchlistItem: function(accountId, movieId, movieTitle, callback) {
            var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const query = 'INSERT INTO UserWatchlistItem (accountId, movieId, movieTitle, createdAt) VALUES (?, ?, ?, ?)'
            const values = [accountId, movieId, movieTitle, date]

            db.query(query, values, function(error, results){
                if(error){
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
        deleteUserWatchlistItem: function(accountId, movieId, callback) {
            const query = 'DELETE FROM UserWatchlistItem WHERE accountId = ? AND movieId = ?'
            const values = [accountId, movieId]

            db.query(query, values, function(error, results){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([], results.affectedRows)
                }
            })
        },

        checkIfWatchlisted: function(accountId, movieId, callback){
            const query = 'SELECT * FROM UserWatchlistItem WHERE accountId = ? AND movieId = ?'
            const values = [accountId, movieId]

            db.query(query, values, function(error, watchlistItem){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], watchlistItem)
                }
            })
        }
    }
}