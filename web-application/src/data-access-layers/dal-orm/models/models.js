const Sequelize = require('sequelize')
const mysql = require('mysql2')

module.exports = function({}){
    const sequelize = new Sequelize(
        'webAppDatabase',
        'root',
        'theRootPassword',
        {
            host: 'database',
            dialect: 'mysql',
            logging: false
        }
    )
    
    const models = {}
    models.Accounts = sequelize.define('accounts', {
        username: Sequelize.TEXT,
        isAdministrator: Sequelize.BOOLEAN,
        hash: Sequelize.TEXT,
        isPublic: Sequelize.BOOLEAN
    })


    models.PublicReviews = sequelize.define('publicReviews', {
        content: Sequelize.TEXT,
        titleId: Sequelize.TEXT
    }, {
        freezeTableName: true
    })
    models.PublicReviews.belongsTo(models.Accounts, { foreignKey: "accountId"})

    models.UserFavourites = sequelize.define('UserFavourites', {
        titleId: Sequelize.TEXT,
        movieTitle: Sequelize.TEXT
    }, {
        freezeTableName: true
    })
    models.UserFavourites.belongsTo(models.Accounts, { foreignKey: "accountId"})

    models.UserWatchlist = sequelize.define('UserWatchlist', {
        titleId: Sequelize.TEXT,
        movieTitle: Sequelize.TEXT
    }, {
        freezeTableName: true
    })
    models.UserWatchlist.belongsTo(models.Accounts, { foreignKey: "accountId"})
    
    models.Top250Movies = sequelize.define('top250Movies', {
        rank: Sequelize.INTEGER,
        title: Sequelize.TEXT,
        fullTitle: Sequelize.TEXT,
        year: Sequelize.INTEGER,
        'image': Sequelize.TEXT,
        releaseDate: Sequelize.TEXT,
        runtimeMins: Sequelize.INTEGER,
        runtimeStr: Sequelize.TEXT,
        plot: Sequelize.TEXT,
        directors: Sequelize.TEXT,
        writers: Sequelize.TEXT,
        stars: Sequelize.TEXT,
        genres: Sequelize.TEXT,
        companies: Sequelize.TEXT,
        contentRating: Sequelize.TEXT,
        imDbRating: Sequelize.FLOAT,
        imDbRatingVotes: Sequelize.INTEGER,
        metacriticRating: Sequelize.INTEGER
    },{
        timestamps: false
    })

    models.TrendingMovies = sequelize.define('trendingMovies', {
        rank: Sequelize.INTEGER,
        title: Sequelize.TEXT,
        fullTitle: Sequelize.TEXT,
        year: Sequelize.INTEGER,
        'image': Sequelize.TEXT,
        releaseDate: Sequelize.TEXT,
        runtimeMins: Sequelize.INTEGER,
        runtimeStr: Sequelize.TEXT,
        plot: Sequelize.TEXT,
        directors: Sequelize.TEXT,
        writers: Sequelize.TEXT,
        stars: Sequelize.TEXT,
        genres: Sequelize.TEXT,
        companies: Sequelize.TEXT,
        contentRating: Sequelize.TEXT,
        imDbRating: Sequelize.FLOAT,
        imDbRatingVotes: Sequelize.INTEGER,
        metacriticRating: Sequelize.INTEGER
    },{
        timestamps: false
    })
    
    return models
}

