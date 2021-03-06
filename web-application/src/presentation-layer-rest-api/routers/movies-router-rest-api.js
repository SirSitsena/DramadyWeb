const express = require('express')

module.exports = function({movieManager, apiManager}){
    const router = express.Router()
    
    router.get('/top250', function(request, response){
        movieManager.getAllMoviesFromTop250(request, function(error, results){
            if(error.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/trending', function(request, response){
        movieManager.getAllMoviesFromTrending(request, function(error, results){
            if(error.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/id/:movieId', function(request, response){
        const movieId = request.params.movieId
        apiManager.getMovieByMovieId(movieId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/favourites', function(request, response){
        const accountId = request.query.accountId
        movieManager.viewFavourites(accountId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/watchlisted', function(request, response){
        const accountId = request.query.accountId
        movieManager.viewWatchlist(accountId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/:keywords', function(request, response){
        const keywords = request.params.keywords
        if(request.params.keywords.length > 0){
            apiManager.getSearchMovieByTitle(null, keywords, function(error, results){
                if(error.length > 0){
                    response.status(500).end()
                } else {
                    response.status(200).json(results)
                }
            })
        } else {
            response.status(400).end()
        }

    })

    return router
}
