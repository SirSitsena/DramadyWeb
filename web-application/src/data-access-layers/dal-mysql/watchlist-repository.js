module.exports = function({db}) {
    return {
        /* ************************* WATCHLIST ************************** */

        getUsersWatchlist: function(accountId, callback){
            const query = 'SELECT * FROM UserWatchlist WHERE accountId = ?'
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
        createUserWatchlist: function(accountId, titleId, movieTitle, callback) {
            const query = 'INSERT INTO UserWatchlist (accountId, titleId, movieTitle) VALUES (?, ?, ?)'
            const values = [accountId, titleId, movieTitle]

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
        deleteUserWatchlist: function(accountId, titleId, callback) {
            const query = 'DELETE FROM UserWatchlist WHERE accountId = ? AND titleId = ?'
            const values = [accountId, titleId]

            db.query(query, values, function(error, results){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([], results.affectedRows)
                }
            })
        },

        checkIfWatchlisted: function(accountId, titleId, callback){
            const query = 'SELECT * FROM UserWatchlist WHERE accountId = ? AND titleId = ?'
            const values = [accountId, titleId]

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