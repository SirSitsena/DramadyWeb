module.exports = function({db}){
    return {
        /*************************************** REVIEWS**************************************** */
        createReview: function(accountId, review, movieId, callback){
            var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const query = 'INSERT INTO reviews (accountId, content, movieId, createdAt) VALUES (?, ?, ?, ?)'
            const values = [accountId, review, movieId, date]

            db.query(query, values, function(error, review){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], review.insertId)
                }
            })
        },

        updateReview: function(id, accountId, review, movieId, callback) {
            var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const query = 'UPDATE reviews SET content = ?, movieId = ?, updatedAt = ? WHERE id = ? AND accountId = ?'
            const values = [review, movieId, date, id, accountId]

            db.query(query, values, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], result)
                }
            })
        },

        deleteReview: function(reviewId, accountId, callback) {
            const query = 'DELETE FROM reviews WHERE accountId = ? and id = ?'
            const values = [accountId, reviewId]

            db.query(query, values, function(error, result){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], result)
                }
            })
        },

        getReviewById: function(reviewId, callback){
            const query = 'SELECT * FROM reviews WHERE id = ?'
            const values = [reviewId]

            db.query(query, values, function(error, review){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], review)
                }
            })
        },

        getReviewsByMovieId: function(movieId, callback){
            const query = 'SELECT * FROM reviews WHERE movieId = ?'
            const values = [movieId]

            db.query(query, values, function(error, reviews){
                if(error){
                    callback(['databaseError'], null)
                } else {
                    callback([], reviews)
                }
            })
        },

        getAllreviews: function(callback){
            const query = 'SELECT * FROM reviews'

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