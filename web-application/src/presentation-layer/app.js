const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')

//redis session store
let RedisStore = require("connect-redis")(session)
const { createClient } = require('redis')
let redisClient = createClient({
	legacyMode: true,
	socket: {
		host: 'cache'
	}
})
redisClient.connect().catch(console.error)



const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const moviesRouter = require('./routers/movies-router')

const app = express()

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))

// Note: This code is for an old version of express-handlebars.
// One should use newest version of packages.
app.engine('hbs', expressHandlebars({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))

// Use redis store for sessions
app.use(
	session({
		store: new RedisStore({client: redisClient}),
		saveUninitialized: false,
		secret: "DramadySecretKey",
		resave: false
	})
)
// Make the session avaliable in views:
app.use(function(request, response, next) {
	response.locals.session = request.session
	next()
})


// Attach all routers.
app.use('/', variousRouter)
app.use('/accounts', accountRouter)
app.use('/movies', moviesRouter)

// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})