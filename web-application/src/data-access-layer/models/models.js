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

    models.Movies = sequelize.define('movies', {
        titleId: Sequelize.TEXT,
        title: Sequelize.TEXT,
        fullTitle: Sequelize.TEXT,
        year: Sequelize.TEXT,
        image: Sequelize.TEXT,
        releaseDate: Sequelize.TEXT,
        runtimeStr: Sequelize.TEXT,
        plot: Sequelize.TEXT,
    })

    models.Comments = sequelize.define('comments', {
        content: Sequelize.TEXT,
        isPublic: Sequelize.BOOLEAN,
    }, {
        freezeTableName: true
    })
    models.Comments.belongsTo(models.Accounts, { foreignKey: "userId"})
    models.Comments.belongsTo(models.Movies, { foreignKe: "userId"})

    models.PublicReviews = sequelize.define('publicReviews', {
        content: Sequelize.TEXT,
        titleId: Sequelize.TEXT
    }, {
        freezeTableName: true
    })
    models.PublicReviews.belongsTo(models.Accounts, { foreignKey: "userId"})

    models.UserFavourites = sequelize.define('UserFavourites', {
        movieId: Sequelize.TEXT,
        movieTitle: Sequelize.TEXT
    }, {
        freezeTableName: true
    })
    models.UserFavourites.belongsTo(models.Accounts, { foreignKey: "userId"})

    models.UserWatchlist = sequelize.define('UserWatchlist', {
        movieId: Sequelize.TEXT,
        movieTitle: Sequelize.TEXT
    }, {
        freezeTableName: true
    })
    models.UserWatchlist.belongsTo(models.Accounts, { foreignKey: "userId"})
    
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

