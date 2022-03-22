const { rejects } = require("assert")

module.exports = function({db, models}){
    return{
        /*************************************** PUBLIC REVIEWS**************************************** */
        createPublicReview: function(accountId, review, titleId, callback){
            console.log("Review2", review)

            models.PublicReviews.create({
                userId: accountId,
                content: review,
                titleId: titleId
            }).then(function(PublicReview){
                callback([], PublicReview.id)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
            /*
            const query = 'INSERT INTO publicReviews (userId, content, titleId) VALUES (?, ?, ?)'
            const values = [accountId, review, titleId]

            db.query(query, values, function(error, results){
                if(error){
                    console.log(error)
                    callback(['databaseError'], null)
                } else {
                    callback([], results.insertId)
                }
            })*/
        },

        updatePublicReview: function(id, accountId, review, titleId, callback) {
            models.PublicReviews.update({
                content: review,
                titleId: titleId
            }, {
                where: {
                    id: id,
                    userId: accountId
                }
            }).then(function(result){
                callback([], result)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
            /*
            const query = "UPDATE publicReviews SET content = ?, titleId = ? WHERE id = ? AND userId = ?"
            const values = [review, titleId, id, accountId]

            db.query(query, values, function(error, result){
                if(error){
                    console.log(error)
                    callback(['databaseError'], null)
                } else {
                    callback([], result)
                }
            })*/
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