module.exports = function({db}){
    return {
        /*************************************** PUBLIC REVIEWS**************************************** */
        createPublicReview: function(accountId, review, titleId, callback){
            const query = 'INSERT INTO publicReviews (accountId, content, titleId) VALUES (?, ?, ?)'
            const values = [accountId, review, titleId]

            db.query(query, values, function(error, review){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], review.insertId)
                }
            })
        },

        updatePublicReview: function(id, accountId, review, titleId, callback) {
            const query = 'UPDATE publicReviews SET content = ?, titleId = ? WHERE id = ? AND accountId = ?'
            const values = [review, titleId, id, accountId]

            db.query(query, values, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], result)
                }
            })
        },

        deletePublicReview: function(reviewId, accountId, callback) {
            const query = 'DELETE FROM publicReviews WHERE accountId = ? and id = ?'
            const values = [accountId, reviewId]

            db.query(query, values, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], result)
                }
            })
        },

        getPublicReviewById: function(reviewId, callback){
            const query = 'SELECT * FROM publicReviews WHERE id = ?'
            const values = [reviewId]

            db.query(query, values, function(error, review){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], review)
                }
            })
        },

        getReviewsByTitleId: function(titleId, callback){
            const query = 'SELECT * FROM publicReviews WHERE titleId = ?'
            const values = [titleId]

            db.query(query, values, function(error, reviews){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], reviews)
                }
            })
        },

        getAllPublicReviews: function(callback){
            const query = 'SELECT * FROM publicReviews'

            db.query(query, function(error, reviews){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], reviews)
                }
            })
        }
    }
}