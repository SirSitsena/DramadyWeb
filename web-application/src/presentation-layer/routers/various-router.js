const express = require('express')

module.exports = function ({movieManager}) {
    const router = express.Router()

    router.get("/about", function (request, response) {
        response.render("about.hbs")
    })

    router.get("/contact", function (request, response) {
        response.render("contact.hbs")
    })

    router.get("/extraFeatures", function (request, response) {
        response.render("deadline.hbs")
    })

    router.get("/", function (request, response) {
        response.render("home.hbs")
    })

    return router
}