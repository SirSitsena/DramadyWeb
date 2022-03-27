const { Op } = require('sequelize')

module.exports = function({db, models}) {
    return {
        /* ************************* WATCHLIST ************************** */

        getUsersWatchlist: function(accountId, callback){

            models.UserWatchlist.findAll({
                where: {
                    accountId: {
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
        createUserWatchlist: function(accountId, titleId, movieTitle, callback) {
            models.UserWatchlist.create({
                accountId: accountId,
                titleId: titleId,
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
        deleteUserWatchlist: function(accountId, titleId, callback) {
            models.UserWatchlist.destroy({
                where: {
                    accountId: accountId,
                    titleId: titleId
                }
            }).then(function(){
                callback([], null)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },

        checkIfWatchlisted: function(accountId, titleId, callback){
            models.UserWatchlist.findAll({
                where: {
                    accountId: accountId,
                    titleId: titleId
                }
            }).then(function(results){
                callback([], results)
            }).catch(function(error){
                callback(['databaseError'], [])
            })
        }
    }
}