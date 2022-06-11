module.exports = function({models}){
    return{
        getUsersFavourites: function(accountId, callback){
            models.UserFavourites.findAll({
                where: {
                    accountId: accountId
                },
				raw: true
            }).then(function(favourites){
                callback([], favourites)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },

        /*
            Add a record to favourites list.

            SUCCESS: RETURNS ID OF FAVOURITE.
        */
        createUserFavourites: function(accountId, movieId, movieTitle, callback) {
            models.UserFavourites.create({
                accountId: accountId,
                movieId: movieId,
                movieTitle: movieTitle
            }).then(function(result){
                callback([], result.dataValues.id)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        },

        /*
            Delete a record from the favourites list.

            SUCCESS: RETURNS (1) DELETED ROW
        */
        deleteUserFavourite: function(accountId, movieId, callback) {
            models.UserFavourites.destroy({
                where: {
                    accountId: accountId,
                    movieId: movieId
                }
            }).then(function(result) {
                callback([], result)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        },

        /*
            Checks if a user has a specific titleId (Movie) favourited

            SUCCESS: Returns rows, if length 0 no favourites, if length > 0 it is favourited.
        */

        checkIfFavourited: function(accountId, movieId, callback){
            models.UserFavourites.findAll({
                where: {
                    accountId: accountId,
                    movieId: movieId
                },
				raw: true
            }).then(function(favourites){
                callback([], favourites)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        }
    }
}