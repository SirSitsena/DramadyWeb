const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"

module.exports = function({movieManager}){
    const router = express.Router()

    router.use(express.json())
    router.use(cookieParser())

    router.get('/', function(request, response){
        console.log("test")
    })

    router.get('/all', function(request, response){
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
        const token = request.cookies.token
        console.log(token)
        console.log('++++++')
        console.log(request.cookies)
        console.log('++++++')
        if(token != null) {
            jwt.verify(token, secret, function(error, payload){
                if(error){
                    console.log(error.name)
                    response.status(401).end()
                } else {
                    //console.log(payload)
                    if(request.body.review != null && request.body.review.length > 0 && request.body.titleId.length > 0 && request.body.titleId != null){
                        const review = request.body.review
                        const titleId = request.body.titleId
                        //console.log("payload account id:" +payload.accountId)
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
        } else {
            response.status(401).end()
        }
    })

    router.post('/update/:reviewId', function(request, response){
        const token = request.cookies.token
        if(token != null){
            jwt.verify(token, secret, function(error, payload){
                if(error){
                    console.log(error.name)
                    response.status(401).end()
                } else {
                    // if(request.body.reviewId != null && request.body.review != null && request.body.titleId != null){ //&& request.body.accountId){
                    if(request.body.reviewId != null && request.body.review != null && request.body.titleId != null && request.body.accountId){
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
                    } else {
                        response.status(400).json({
                            error: "Form input incomplete"
                        })
                    }
                }
            })
        } else {
            response.status(401).end()
        }
        
    })
    //-----------------------------------DELETE ALPHA

    router.post('/delete/:reviewId', function(request, response){
        const token = request.cookies.token
        if(token != null){
            jwt.verify(token, secret, function(error, payload){
                if(error){
                    console.log(error.name)
                    response.status(401).end()
                } else {
                    if(request.body.reviewId != null && request.body.accountId){
                        const reviewId = request.body.reviewId
                        movieManager.deletePublicReview(reviewId, payload.accountId, function(error, result) {
                            if(error.length > 0){
                                console.log(error)
                            } else {
                                //Another code?
                                response.status(200).end()
                            }
                        })
                    } else {
                        response.status(400).json({
                            error: "Form input incomplete"
                        })
                    }
                }
            })
        } else {
            response.status(401).end()
        }

    })


    //-------------------------------------DELETE FUNC

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

    //Create delete route
    
    return router
}