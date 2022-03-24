const express = require('express')

module.exports = function({movieManager, apiManager}){
    const router = express.Router()

    router.get('/', function(request, response){
        console.log("test")
    })
    
    router.get('/search/:keywords', function(request, response){
        console.log("search recieved")
        const keywords = request.params.keywords
        apiManager.getSearchMovieByTitle(null, keywords, function(error, results){
            if(error.length > 0){
                response.status(500).end()
                console.log(error)
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/top250', function(request, response){
        console.log("response for 250")
        movieManager.getAllMoviesFromTop250(request, function(error, results){
            if(error.length > 0){
                response.status(500).end()
                console.log(error)
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.get('/trending', function(request, response){
        console.log("response for trending")
        movieManager.getAllMoviesFromTrending(request, function(error, results){
            if(error.length > 0){
                response.status(500).end()
                console.log(error)
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
                console.log(error)
            } else {
                response.status(200).json(results)
            }
        })
    })


    //----------------------------------------------------- NEW ----

    router.get('/favourites/:accountId', function(request, response){
        const accountId = request.params.accountId
        movieManager.viewFavourites(accountId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
                console.log(error)
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
                console.log(error)
            } else {
                response.status(200).json(results)
            }
        })
    })


//------------------------------------------------------ NEW-END ----




    return router
}