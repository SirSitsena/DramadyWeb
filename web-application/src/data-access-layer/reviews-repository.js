const { rejects } = require("assert")

module.exports = function({db, models}){
    return{
        /*************************************** PUBLIC REVIEWS**************************************** */
        createPublicReview: function(accountId, review, titleId, callback){

            models.PublicReviews.create({
                accountId: accountId,
                content: review,
                titleId: titleId
            }).then(function(PublicReview){
                callback([], PublicReview.id)
            }).catch(function(error){
                console.log(error)
                callback(['databaseError'], null)
            })
        },

        updatePublicReview: function(id, accountId, review, titleId, callback) {
            models.PublicReviews.update({
                content: review,
                titleId: titleId
            }, {
                where: {
                    id: id,
                    accountId: accountId
                }
            }).then(function(result){
                callback([], result)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },

        deletePublicReview: function(id, accountId, callback) {
            models.PublicReviews.destroy({
                where: {
                    id: id,
                    accountId: accountId
                }
            }).then(callback)
            .catch(function(error){
                callback(error, null)
            })
        },

        getPublicReviewById: function(reviewId, callback){
            models.PublicReviews.findOne({
                where: {
                    id: reviewId
                }
            }).then(function(review){
                callback([], review)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },
        getReviewsByTitleId: function(titleId, callback){
            models.PublicReviews.findAll({
                where: {
                    titleId: titleId
                }
            }).then(function(reviews) {
                callback([], reviews)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        },
        getAllPublicReviews: function(callback){
            models.PublicReviews.findAll().then(function(reviews){
                callback([], reviews)
            }).catch(function(errors) {
                callback(['databaseError'], null)
            })
        }
    }
}