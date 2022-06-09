module.exports = function({models}){
    return {
        /*
            Retrieves the movie with the given id.
            Possible errors: databaseError
            Success value: The fetched movie, or null if no movie has that id.
        */
        getMovieById: function(id, callback){
            models.TrendingMovies.findOne({
                where: {
                    id: id
                },
				raw: true
            }).then(function(movie){
                callback([], movie)
            }).catch(function(error){
                callback(['databaseError'], null)
            })

        },

        /*
            Retrieves all movies ordered by rank.
            Possible errors: databaseError
            Success value: The fetched movies in an array.
        */
        getAllMovies: function(callback){
            models.TrendingMovies.findAll({
                order: ['rank'],
				raw: true
            }).then(function(movies) {
                callback([], movies)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })

        },

        /*
            Retrieves the movie with the given rank.
            Possible errors: databaseError
            Success value: The fetched movie, or null if no movie has that rank.
        */
        getMovieByRank: function(rank, callback){
            models.TrendingMovies.findOne({
                where: {
                    rank: rank
                },
				raw: true
            }).then(function(movie){
                callback([], movie)
            }).catch(function(error){
                callback(['databaseError'], null)
            })
        },


        /*
            Retrieves the movie with the given year.
            Possible errors: databaseError
            Success value: The fetched movie, or null if no movie has that year.
        */
        getMovieByYear: function(year, callback){
            models.TrendingMovies.findAll({
                where: {
                    year: year
                },
				raw: true
            }).then(function(movies){
                callback([], movies)
            }).catch(function(error) {
                callback(['databaseError'], null)
            })
        }
    }
}