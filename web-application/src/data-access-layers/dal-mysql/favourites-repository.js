module.exports = function({db}){
    return{
        getUsersFavourites: function(accountId, callback){
            const query = 'SELECT * FROM UserFavourites WHERE accountId = ?'
            const values = [accountId]

            db.query(query, values, function(errors, favourites){
                if(errors){
                    callback(['databaseError'], null)
                } else {
                    callback([], favourites)
                }
            })
        },

        /*
            Add a record to favourites list.

            SUCCESS: RETURNS ID OF FAVOURITE.
        */
        createUserFavourites: function(accountId, titleId, movieTitle, callback) {
            const query = 'INSERT INTO UserFavourites (accountId, titleId, movieTitle) VALUES (?, ?, ?)'
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
            Delete a record from the favourites list.

            SUCCESS: RETURNS (1) DELETED ROW
        */
        deleteUserFavourite: function(accountId, titleId, callback) {
            const query = 'DELETE FROM UserFavourites WHERE accountId = ? AND titleId = ?'
            const values = [accountId, titleId]

            db.query(query, values, function(error, results){
                if(error){
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

        checkIfFavourited: function(accountId, titleId, callback){
            const query = 'SELECT * FROM UserFavourites WHERE accountId = ? AND titleId = ?'
            const values = [accountId, titleId]

            db.query(query, values, function(error, favourites){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], favourites)
                }
            })
        }
    }
}