const { rejects } = require("assert")

module.exports = function({models}){
    return{
        /*************************************** PUBLIC REVIEWS**************************************** */
        createReview: function(accountId, review, movieId, callback){

            models.Reviews.create({
                accountId: accountId,
                content: review,
                movieId: movieId
            }).then(function(Review){
                callback([], Review.dataValues.id)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },

        updateReview: function(id, accountId, review, movieId, callback) {
            models.Reviews.update({
                content: review,
                movieId: movieId
            }, {
                where: {
                    id: id,
                    accountId: accountId
                }
            }).then(function(result){
                callback([], result.dataValues)
            }).catch(function(error){
                console.log(error)
                callback(['databaseError'], null)
            })
        },

        deleteReview: function(id, accountId, callback) {
            models.Reviews.destroy({
                where: {
                    id: id,
                    accountId: accountId
                }
            }).then(callback)
            .catch(function(error){
                callback(error, null)
            })
        },

        getReviewById: function(reviewId, callback){
            models.Reviews.findOne({
                where: {
                    id: reviewId
                },
				raw: true
            }).then(function(review){
                callback([], review)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },
        getReviewsByMovieId: function(movieId, callback){
            models.Reviews.findAll({
                where: {
                    movieId: movieId
                },
				raw: true
            }).then(function(reviews) {
                callback([], reviews)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        },
        getAllReviews: function(callback){
            models.Reviews.findAll({
				raw: true
            }).then(function(reviews){
                callback([], reviews)
            }).catch(function(errors) {
                callback(['databaseError'], null)
            })
        }
    }
}