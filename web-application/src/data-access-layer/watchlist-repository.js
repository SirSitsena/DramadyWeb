const { Op } = require('sequelize')

module.exports = function({db, models}) {
    return {
        /* ************************* WATCHLIST ************************** */

        getUsersWatchlist: function(accountId, callback){

            models.UserWatchlist.findAll({
                where: {
                    userId: {
                        [Op.eq]: accountId
                    }
                }
            }).then(function(watchlist){
                callback([], watchlist)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },

        /*
            Add a record to watchlist.

            SUCCESS: RETURNS ID OF watchlist item.
        */
        createUserWatchlist: function(userId, movieId, movieTitle, callback) {
            models.UserWatchlist.create({
                userId: userId,
                movieId: movieId,
                movieTitle: movieTitle
            })
            .then(function(watchlistItem){
                callback([], watchlistItem.id)
            })
            .catch(function(errors){
                callback(['databaseError'], null)
            })
        },

        /*
            Delete a record from the watchlist.

            SUCCESS: RETURNS (1) DELETED ROW
        */
        deleteUserWatchlist: function(userId, movieId, callback) {
            models.UserWatchlist.destroy({
                where: {
                    userId: userId,
                    movieId: movieId
                }
            }).then(function(){
                callback([], null)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },

        checkIfWatchlisted: function(userId, titleId, callback){
            models.UserWatchlist.findAll({
                where: {
                    userId: userId,
                    movieId: titleId
                }
            }).then(function(results){
                callback([], results)
            }).catch(function(error){
                callback(['databaseError'], [])
            })
        }
    }
}