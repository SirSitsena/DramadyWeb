const express = require('express')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const secret = "uasnbdiunasiuduianisudnianiusdnpwioperjwer"

// const cors = require('cors');

module.exports = function({accountManager}) {
    const router = express.Router()

    // router.use(function(request, response, next){
    //     // response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
    //     response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //
    //     // Request methods you wish to allow
    //     response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //
    //     // Request headers you wish to allow
    //     response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    //
    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    //     response.setHeader('Access-Control-Allow-Credentials', true);
    //     next()
    // })

    router.get('/', function(request, response){
        console.log("test")
    })

    router.use(express.json())
    router.use(express.urlencoded({
        extended: false,
    }))
    router.use(cookieParser())

    // router.use(cors())


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
                            // // Website you wish to allow to connect
                            // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
                            //
                            // // Request methods you wish to allow
                            // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                            //
                            // // Request headers you wish to allow
                            // response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                            //
                            // // Set to true if you need the website to include cookies in the requests sent
                            // // to the API (e.g. in case you use sessions)
                            // response.setHeader('Access-Control-Allow-Credentials', true);
                            response.cookie('token', token, {maxAge: 1000*60*60}).status(200).json({test:"signed in" , isLoggedIn: true, accountId: accountId})
                        }
                    })
                } else {
                    // SEND CORRECT RESPONE ACCORDING TO AUTH2.0
                    response.status(400).end()
                }
            })
        } else {
            //grant type wrong
            // SEND CORRECT RESPONE ACCORDING TO AUTH2.0
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