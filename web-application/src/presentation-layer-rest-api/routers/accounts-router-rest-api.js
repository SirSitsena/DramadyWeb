const express = require('express')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"


module.exports = function({accountManager}) {
    const router = express.Router()

    router.use(express.json())
    router.use(express.urlencoded({
        extended: false,
    }))
    router.use(cookieParser())

    router.post('/tokens', function(request, response){
        const grant_type = request.body.grant_type
        const account = {}
        account.username = request.body.username
        account.password = request.body.password
        if(grant_type == "password"){
            accountManager.signIn(account, function(errors, accountId){
                if(errors.length > 0){
                    response.status(400).json({
                        error: "error logging in"
                    })
                } else {
                    if(accountId != null){
                        const payload = {
                            isLoggedIn: true,
                            accountId: accountId
                        }

                        jwt.sign(payload, secret , {expiresIn: (1000*60*60).toString()+'ms' },function(error, token) {
                            if(error){
                                response.status(500).end()
                            } else {
                                response.cookie('token', token, {maxAge: 1000*60*60}).status(200).json({message:"signed in" , isLoggedIn: true, accountId: accountId})
                            }
                        })
                    } else {
                        response.status(400).json({
                            error: "wrong password"
                        }).end()
                    }
                }
            })
        } else {
            response.status(400).json({
                error: "invalid_grant"
            })
        }
    })

    router.post('/sign-out', function(request, response){
        response.clearCookie('token').status(200).json({message: "Signed out"})
    })

    router.post('/', function(request, response){
        const account = {}
        account.username = request.body.username
        account.password = request.body.password

        accountManager.createAccount(account, function(errors, accountId) {
            if(errors.length > 0){
                console.log(errors)
                response.status(500).json({error: "account couldn't be created due to unknown error."})
            } else {
                accountManager.signIn(account, function(errors, accountId){
                    if(errors.length > 0){
                        response.status(200).json({message: "Incorrect information."})
                        //response.status(500).json({errors: errors})
                    } else {
                        const payload = {
                            isLoggedIn: true,
                            accountId: accountId
                        }
                        jwt.sign(payload, secret, {expiresIn: (1000*60*60).toString()+'ms' }, function(error, token) {
                            if(error){
                                response.status(500).end()
                            } else {
                                response.cookie('token', token, {maxAge: 1000*60*60}).status(200).json({message:"signed in" , isLoggedIn: true, accountId: accountId})
                            }
                        })
                    }
                })
            }
        })
    })

    return router
}