module.exports = function({db}){
    return{
        /*************************************** PUBLIC REVIEWS**************************************** */
        createPublicReview: function(accountId, review, titleId, callback){
            console.log("Review2", review)
            const query = 'INSERT INTO publicReviews (userId, content, titleId) VALUES (?, ?, ?)'
            const values = [accountId, review, titleId]

            db.query(query, values, function(error, results){
                if(error){
                    console.log(error)
                    callback(['databaseError'], null)
                } else {
                    callback([], results.insertId)
                }
            })
        },

        updatePublicReview: function(id, accountId, review, titleId, callback) {
            const query = "UPDATE publicReviews SET content = ?, titleId = ? WHERE id = ? AND userId = ?"
            const values = [review, titleId, id, accountId]

            db.query(query, values, function(error, result){
                if(error){
                    console.log(error)
                    callback(['databaseError'], null)
                } else {
                    callback([], result)
                }
            })
        },
        getPublicReviewById: function(reviewId, callback){
            const query = 'SELECT * FROM publicReviews WHERE id = ?'
            const values = [reviewId]

            db.query(query, values, function(error, results){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], results)
                }
            })
        },
        getReviewsByTitleId: function(titleId, callback){
            const query = 'SELECT * FROM publicReviews WHERE titleId = ?'
            const values = [titleId]

            db.query(query, values, function(error, results){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], results)
                }
            })
        },
        getAllPublicReviews: function(callback){
            const query = 'SELECT * FROM publicReviews'

            db.query(query, function(error, results){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], results)
                }
            })
        }
    }
}