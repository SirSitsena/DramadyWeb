const awilix = require('awilix')
const container = awilix.createContainer()

// DATA ACCESS LAYER
// TO USE ORM UNCOMMENT LINES BELOW:
// -------------------------------------------------------------------------------------------------------------------------------
/*
    container.register("accountRepository", awilix.asFunction(require('./data-access-layers/dal-orm/account-repository')))
    container.register("movieTop250Repository", awilix.asFunction(require('./data-access-layers/dal-orm/top250-repository')))
    container.register("favouritesRepository", awilix.asFunction(require('./data-access-layers/dal-orm/favourites-repository')))
    container.register("watchlistRepository", awilix.asFunction(require('./data-access-layers/dal-orm/watchlist-repository')))
    container.register("reviewsRepository", awilix.asFunction(require('./data-access-layers/dal-orm/reviews-repository')))
    container.register("movieTrendingRepository", awilix.asFunction(require('./data-access-layers/dal-orm/trending-repository')))
//models
container.register('models', awilix.asFunction(require('./data-access-layers/dal-orm/models/models')))
*/
// --------------------------------------------------------------------------------------------------------------------------------
// TO USE MySQL WITHOUT ORM USE THE LINES BELOW:
// ---------------------------------------------------------------------------------------------------------------------------------
//DATABASE
container.register("db", awilix.asValue(require('./data-access-layers/dal-mysql/db')))
//Repos
container.register("accountRepository", awilix.asFunction(require('./data-access-layers/dal-mysql/account-repository')))
container.register("movieTop250Repository", awilix.asFunction(require('./data-access-layers/dal-mysql/top250-repository')))
container.register("favouritesRepository", awilix.asFunction(require('./data-access-layers/dal-mysql/favourites-repository')))
container.register("watchlistRepository", awilix.asFunction(require('./data-access-layers/dal-mysql/watchlist-repository')))
container.register("reviewsRepository", awilix.asFunction(require('./data-access-layers/dal-mysql/reviews-repository')))
container.register("movieTrendingRepository", awilix.asFunction(require('./data-access-layers/dal-mysql/trending-repository')))
/* -------------------------------------------------------------------------------------------------------------------------------- */

//ACCOUNTS
container.register("accountValidator", awilix.asFunction(require('./business-logic-layer/account-validator')))
container.register("accountManager", awilix.asFunction(require('./business-logic-layer/account-manager')))
container.register("accountRouter", awilix.asFunction(require('./presentation-layer/routers/account-router')))
//Movies
container.register("movieManager", awilix.asFunction(require('./business-logic-layer/movie-manager')))
container.register("reviewValidator", awilix.asFunction(require('./business-logic-layer/review-validator')))
container.register("movieRouter", awilix.asFunction(require('./presentation-layer/routers/movies-router')))
//API
container.register("apiRepository", awilix.asFunction(require('./data-access-layers/api-repository')))
container.register('apiManager', awilix.asFunction(require('./business-logic-layer/api-manager')))
container.register("variousRouter", awilix.asFunction(require('./presentation-layer/routers/various-router')))
container.register('moviesRouterRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/routers/movies-router-rest-api')))
container.register('reviewsRouterRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/routers/reviews-router-rest-api')))
container.register('accountsRouterRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/routers/accounts-router-rest-api'))) /*NEW NEW NEW NEW NEW NEW NEW*/
container.register('appRESTAPI', awilix.asFunction(require('./presentation-layer-rest-api/rest-api-app.js')))

container.register('app', awilix.asFunction(require('./presentation-layer/app.js')))

const app = container.resolve('app')