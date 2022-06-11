const { Op } = require('sequelize')

module.exports = function({models}) {
    return {
        /* ************************* WATCHLIST ************************** */

        getUsersWatchlist: function(accountId, callback){

            models.UserWatchlistItem.findAll({
                where: {
                    accountId: {
                        [Op.eq]: accountId
                    }
                },
				raw: true
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
        createUserWatchlistItem: function(accountId, movieId, movieTitle, callback) {
            models.UserWatchlistItem.create({
                accountId: accountId,
                movieId: movieId,
                movieTitle: movieTitle
            })
            .then(function(watchlistItem){
                callback([], watchlistItem.dataValues.id)
            })
            .catch(function(errors){
                callback(['databaseError'], null)
            })
        },

        /*
            Delete a record from the watchlist.

            SUCCESS: RETURNS (1) DELETED ROW
        */
        deleteUserWatchlistItem: function(accountId, movieId, callback) {
            models.UserWatchlist.destroy({
                where: {
                    accountId: accountId,
                    movieId: movieId
                }
            }).then(function(){
                callback([], null)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },

        checkIfWatchlisted: function(accountId, movieId, callback){
            console.log(movieId)
            models.UserWatchlist.findAll({
                where: {
                    accountId: accountId,
                    movieId: movieId
                },
				raw: true
            }).then(function(results){
                callback([], results)
            }).catch(function(error){
                callback(['databaseError'], [])
            })
        }
    }
}