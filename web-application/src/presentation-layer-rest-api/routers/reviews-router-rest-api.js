const express = require('express')
const jwt = require('jsonwebtoken')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"

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
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer " .length)

        jwt.verify(accessToken, secret, function(error, payload){
            if(error){
                console.log(error)
                response.status(401).end()
            } else {
                console.log(payload)
                if(request.body.review != null && request.body.review.length > 0 && request.body.titleId.length > 0 && request.body.titleId != null){    
                    const review = request.body.review
                    const titleId = request.body.titleId
                    movieManager.createPublicReview(payload.accountId, review, titleId, function(error, results){
                        if(error.length > 0){
                            console.log(error)
                            response.status(404).end()
                        } else {
                            response.setHeader("Location", "/api/reviews/"+results)
                            response.status(201).end()
                        }
                    })
                } else {
                    response.status(400).json({
                        error: "Review or Title input incomplete."
                    })
                }
                
            }
        })
    })

    router.post('/update', function(request, response){
        const authorizationHeader = request.header("Authorization")
        const accessToken = authorizationHeader.substring("Bearer " .length)
        jwt.verify(accessToken, secret, function(error, payload){
            if(error){
                console.log(error)
                response.status(401).end()
            } else {
                if(request.body.reviewId != null && request.body.review != null && request.body.titleId != null){ //&& request.body.accountId){
                    const reviewId = request.body.reviewId
                    const review = request.body.review
                    const titleId = request.body.titleId
                    movieManager.updatePublicReview(reviewId, payload.accountId, review, titleId, function(error, result) {
                        if(error.length > 0){
                            console.log(error)
                        } else {
                            //Another code?
                            response.status(200).end()
                        }
                    })
                    //const accountId = request.body.accountId ?????????????
                } else {
                    response.status(400).json({
                        error: "Form input incomplete"
                    })
                }
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