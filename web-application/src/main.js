const awilix = require('awilix')
const container = awilix.createContainer()
//DATABASE
container.register("db", awilix.asValue(require('./data-access-layer/db')))

//ACCOUNTS
container.register("accountRepository", awilix.asFunction(require('./data-access-layer/account-repository')))
container.register("accountValidator", awilix.asFunction(require('./business-logic-layer/account-validator')))
container.register("accountManager", awilix.asFunction(require('./business-logic-layer/account-manager')))
container.register("accountRouter", awilix.asFunction(require('./presentation-layer/routers/account-router')))
//Movies
container.register("movieTop250Repository", awilix.asFunction(require('./data-access-layer/top250-repository')))
container.register("favouritesRepository", awilix.asFunction(require('./data-access-layer/favourites-repository')))
container.register("watchlistRepository", awilix.asFunction(require('./data-access-layer/watchlist-repository')))
container.register("reviewsRepository", awilix.asFunction(require('./data-access-layer/reviews-repository')))
container.register("movieTrendingRepository", awilix.asFunction(require('./data-access-layer/trending-repository')))
container.register("movieManager", awilix.asFunction(require('./business-logic-layer/movie-manager')))
container.register("movieRouter", awilix.asFunction(require('./presentation-layer/routers/movies-router')))
//API
container.register("apiRepository", awilix.asFunction(require('./data-access-layer/api-repository')))
container.register('apiManager', awilix.asFunction(require('./business-logic-layer/api-manager')))

container.register("variousRouter", awilix.asFunction(require('./presentation-layer/routers/various-router')))

//const appRESTAPI = require('./presentation-layer-rest-api/rest-api-app')
container.register('moviesRouterRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/routers/movies-router-rest-api')))
container.register('reviewsRouterRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/routers/reviews-router-rest-api')))
container.register('accountsRouterRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/routers/accounts-router-rest-api'))) /*NEW NEW NEW NEW NEW NEW NEW*/
container.register('appRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/rest-api-app.js')))

container.register('app', awilix.asFunction(require('./presentation-layer/app.js')))

const app = container.resolve('app')