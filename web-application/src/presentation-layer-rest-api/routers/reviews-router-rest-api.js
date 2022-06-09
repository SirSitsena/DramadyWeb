const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { response } = require('express')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"

module.exports = function({movieManager}){
    const router = express.Router()

    router.use(express.json())
    router.use(cookieParser())

    router.get('/all', function(request, response){
        movieManager.getAllPublicReviews(function(errors, results){
            if(errors.length > 0){
                response.status(500).end()
            } else {
                response.status(200).json(results)
            }
        })
    })

    router.post('/', function(request, response){
        var token = request.cookies.token
        if(token != null) {
            jwt.verify(token, secret, function(error, payload){
                if(error){
                    response.status(401).end()
                } else {
                    if(request.body.review != null && request.body.review.length > 0 && request.body.titleId.length > 0 && request.body.titleId != null){
                        const review = request.body.review
                        const titleId = request.body.titleId
                        movieManager.createPublicReview(payload.accountId, review, titleId, function(error, results){
                            if(error.length > 0){
                                response.status(500).end()
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
            token = request.body.token
            if(token != null) {
                jwt.verify(token, secret, function(error, payload){
                    if(error){
                        response.status(401).end()
                    } else {
                        if(request.body.review != null && request.body.review.length > 0 && request.body.titleId.length > 0 && request.body.titleId != null){
                            const review = request.body.review
                            const titleId = request.body.titleId
                            movieManager.createPublicReview(payload.accountId, review, titleId, function(error, results){
                                if(error.length > 0){
                                    response.status(500).end()
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
                response.status(400).json({
                    error: "Form input incomplete"
                })
            }
        }
    })

    router.put('/', function(request, response) {
        var token = request.cookies.token
        if(token != null){
            jwt.verify(token, secret, function(error, payload){
                if(error){
                    response.status(401).end()
                } else {
                    if(request.body.reviewId != null && request.body.review != null && request.body.titleId != null){
                        const reviewId = request.body.reviewId
                        const review = request.body.review
                        const titleId = request.body.titleId
                        movieManager.updatePublicReview(reviewId, payload.accountId, review, titleId, function(error, result) {
                            if(error.length > 0){
                                response.status(500).end()
                            } else {
                                response.status(200).json({
                                    message: "Updated review."
                                })
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
            token = request.body.token
            if(token != null){
                jwt.verify(token, secret, function(error, payload){
                    if(error){
                        response.status(401).end()
                    } else {
                        if(request.body.reviewId != null && request.body.review != null && request.body.titleId != null){
                            const reviewId = request.body.reviewId
                            const review = request.body.review
                            const titleId = request.body.titleId
                            movieManager.updatePublicReview(reviewId, payload.accountId, review, titleId, function(error, result) {
                                if(error.length > 0){
                                    response.status(500).end()
                                } else {
                                    response.status(200).json({
                                        message: "Updated review."
                                    })
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
                response.status(400).json({
                    error: "Form input incomplete"
                })
            }
        }
    })

    router.delete('/', function(request, response){
        var token = request.cookies.token
        if(token != null){
            jwt.verify(token, secret, function(error, payload){
                if(error){
                    response.status(401).end()
                } else {
                    if(request.body.reviewId != null){
                        const reviewId = request.body.reviewId
                        movieManager.deletePublicReview(reviewId, payload.accountId, function(error, result) {
                            if(error.length > 0){
                                response.status(500).end()
                            } else {
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
            token = request.body.token
            if(token != null){
                jwt.verify(token, secret, function(error, payload){
                    if(error){
                        response.status(401).end()
                    } else {
                        if(request.body.reviewId != null){
                            const reviewId = request.body.reviewId
                            movieManager.deletePublicReview(reviewId, payload.accountId, function(error, result) {
                                if(error.length > 0){
                                    response.status(500).end()
                                } else {
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
                response.status(400).json({
                    error: "Form input incomplete"
                })
            }
        }

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

    return router
}