const awilix = require('awilix')
//web-application\src\data-access-layer
//ACCOUNTS
const accountRepository = require('./data-access-layer/account-repository')
const accountValidator = require('./business-logic-layer/account-validator')
const accountManager = require('./business-logic-layer/account-manager')
const accountRouter = require('./presentation-layer/routers/account-router')
//Movies
const movieRepository = require('./data-access-layer/movie-repository')
const movieManager = require('./business-logic-layer/movie-manager')
const movieRouter = require('./presentation-layer/routers/movies-router')

const variousRouter = require('./presentation-layer/routers/various-router')

const db = require('./data-access-layer/db')

const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))

container.register("variousRouter", awilix.asFunction(variousRouter))

container.register("movieRepository", awilix.asFunction(movieRepository))
container.register("movieManager", awilix.asFunction(movieManager))
container.register("movieRouter", awilix.asFunction(movieRouter))

container.register('app', awilix.asFunction(require('./presentation-layer/app.js')))

const app = container.resolve('app')