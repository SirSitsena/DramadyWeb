const express = require('express')

module.exports = function({movieManager}){
    const router = express.Router()

    router.use(express.json())

    router.get('/', function(request, response){
        console.log("test")
    })

    router.get('/all', function(request, response){
        console.log("all")
        movieManager.getAllPublicReviews(function(errors, results){
            if(errors.length > 0){
                console.log(errors)
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.post('/create', function(request, response){
        const review = request.body.review
        const titleId = request.body.titleId
        console.log("review: ", review)

        movieManager.createPublicReview(review, titleId, function(error, results){
            if(error.length > 0){
                console.log(error)
                response.status(404).end()
            } else {
                response.setHeader("Location", "/api/reviews/"+results)
                response.status(201).end()
            }
        })
    })

    router.get('/:id', function(request, response){
        const reviewId = request.params.id
        movieManager.getPublicReviewById(reviewId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                if(results.length > 0){
                    response.status(200).json(results[0])
                } else {
                    response.status(404).end()
                }
            }
        })
    })

    router.get('/byTitleId/:titleId', function(request, response){
        const titleId = request.params.titleId
        movieManager.getReviewsByTitleId(titleId, function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    
    
    return router
}