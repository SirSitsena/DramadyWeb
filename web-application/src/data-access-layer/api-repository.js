const request = require('request')
const API_KEY_1 = "k_9t0l0iej"

module.exports = function({}){
    return {
        getSearchMovieByTitle: function(keywords, callback){
            request('https://imdb-api.com/en/API/SearchMovie/'+API_KEY_1+'/'+keywords, { json: true}, (error, responsee, body) => {
                if(error || body.errorMessage != ""){
                    callback(error, null)
                } else {
                    callback(null, body.results)
                }
            })
        }
    }
}