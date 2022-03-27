const express = require('express')

module.exports = function({movieManager, apiManager}){
    const router = express.Router()
    
    router.get('/search/:keywords', function(request, response){
        const keywords = request.params.keywords
        apiManager.getSearchMovieByTitle(null, keywords, function(error, results){
            if(error.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

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

    router.get('/id/:titleId', function(request, response){
        const titleId = request.params.titleId
        apiManager.getMovieByTitleId(titleId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/favourites/:accountId', function(request, response){
        const accountId = request.params.accountId
        movieManager.viewFavourites(accountId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/watchlisted/:accountId', function(request, response){
        const accountId = request.params.accountId
        movieManager.viewWatchlist(accountId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    return router
}