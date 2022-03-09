const awilix = require('awilix')
//ACCOUNTS
const accountRepository = require('./data-access-layer/account-repository')
const accountValidator = require('./business-logic-layer/account-validator')
const accountManager = require('./business-logic-layer/account-manager')
const accountRouter = require('./presentation-layer/routers/account-router')
//Movies
const movieRepository = require('./data-access-layer/movie-repository')
const movieManager = require('./business-logic-layer/movie-manager')
const movieRouter = require('./presentation-layer/routers/movies-router')
//API
const apiRepository = require('./data-access-layer/api-repository')
const apiManager = require('./business-logic-layer/api-manager')


const variousRouter = require('./presentation-layer/routers/various-router')

const moviesRouterRESTAPI = require('./presentation-layer-rest-api/routers/movies-router-rest-api')
const reviewsRouterRESTAPI = require('./presentation-layer-rest-api/routers/reviews-router-rest-api')
//const appRESTAPI = require('./presentation-layer-rest-api/rest-api-app')

const db = require('./data-access-layer/db')

const container = awilix.createContainer()

container.register("apiRepository", awilix.asFunction(apiRepository))
container.register('apiManager', awilix.asFunction(apiManager))

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))

container.register("variousRouter", awilix.asFunction(variousRouter))

container.register("movieRepository", awilix.asFunction(movieRepository))
container.register("movieManager", awilix.asFunction(movieManager))
container.register("movieRouter", awilix.asFunction(movieRouter))

container.register('moviesRouterRESTAPI', awilix.asFunction(moviesRouterRESTAPI))
container.register('reviewsRouterRESTAPI', awilix.asFunction(reviewsRouterRESTAPI))
container.register('appRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/rest-api-app.js')))

container.register('app', awilix.asFunction(require('./presentation-layer/app.js')))

const app = container.resolve('app')