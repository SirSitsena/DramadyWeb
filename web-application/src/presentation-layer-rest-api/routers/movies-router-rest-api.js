const express = require('express')

module.exports = function({movieManager, apiManager}){
    const router = express.Router()

    router.use(express.json())

    router.get('/', function(request, response){
        console.log("test")
    })
    
    router.get('/search/:keywords', function(request, response){
        console.log("search recieved")
        const keywords = request.params.keywords
        apiManager.getSearchMovieByTitle(keywords, function(error, results){
            if(error.length > 0){
                response.status(500).end()
                console.log(error)
            } else {
                response.status(200).json(results)
            }
        })
    })

    return router
}