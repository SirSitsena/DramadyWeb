module.exports = function({db, models}){
    return{
        getUsersFavourites: function(userId, callback){
            models.UserFavourites.findAll({
                where: {
                    userId: userId
                }
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
        createUserFavourites: function(userId, movieId, movieTitle, callback) {
            models.UserFavourites.create({
                userId: userId,
                movieId: movieId,
                movieTitle: movieTitle
            }).then(function(result){
                callback([], result.id)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        },

        /*
            Delete a record from the favourites list.

            SUCCESS: RETURNS (1) DELETED ROW
        */
        deleteUserFavourite: function(userId, movieId, callback) {
            models.UserFavourites.destroy({
                where: {
                    userId: userId,
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

        checkIfFavourited: function(userId, titleId, callback){
            models.UserFavourites.findAll({
                where: {
                    userId: userId,
                    movieId: titleId
                }
            }).then(function(favourites){
                callback([], favourites)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        }
    }
}