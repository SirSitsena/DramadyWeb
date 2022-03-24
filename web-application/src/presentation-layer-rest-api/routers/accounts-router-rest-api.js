const express = require('express')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"


module.exports = function({accountManager}) {
    const router = express.Router()


    router.get('/', function(request, response){
        console.log("test")
    })

    router.use(express.json())
    router.use(express.urlencoded({
        extended: false,
    }))
    router.use(cookieParser())


    router.post('/sign-up', function(request, response) {
        const account = {}
        account.username = request.body.username
        account.fullname = request.body.fullname
        account.password = request.body.password

        accountManager.createAccount(account, function(errors, accountId) {
            if(errors.length > 0){
                response.status(500).json({error: "account couldn't be created due to unknown error."})
            } else {
                accountManager.signIn(account, function(errors, accountId){
                    if(errors.length > 0){
                        response.status(500).json({errors: errors})
                    } else {
                        const payload = {
                            isLoggedIn: true,
                            accountId: accountId
                        }
                        jwt.sign(payload, secret , {expiresIn: (1000*60*60).toString()+'ms' },function(error, token) {
                            if(error){
                                //Error
                            } else {
                                response.cookie('token', token, {maxAge: 1000*60*60}).status(200).json({test:"signed in" , isLoggedIn: true})
                            }
                        })
                    }
                })
            }
        })
    })

    router.post('/tokens', function(request, response){
        const grant_type = request.body.grant_type
        const account = {}
        account.username = request.body.username
        account.password = request.body.password
        if(grant_type == "password"){
            accountManager.signIn(account, function(errors, accountId){
                if(accountId != null){
                    const payload = {
                        isLoggedIn: true,
                        accountId: accountId
                    }

                    jwt.sign(payload, secret , {expiresIn: (1000*60*60).toString()+'ms' },function(error, token) {
                        if(error){
                            //ERROR
                        } else {
                            response.cookie('token', token, {maxAge: 1000*60*60}).status(200).json({test:"signed in" , isLoggedIn: true, accountId: accountId})
                        }
                    })
                } else {
                    // SEND CORRECT RESPONSE ACCORDING TO AUTH2.0
                    response.status(400).end()
                }
            })
        } else {
            //grant type wrong
            // SEND CORRECT RESPONSE ACCORDING TO AUTH2.0
            console.log("grant")
            response.status(400).json({
                error: "invalid_grant"
            })
        }

    })

    router.post('/sign-out', function(request, response){
        response.clearCookie('token').status(200).json({message: "Signed out"})
    })





    return router

}