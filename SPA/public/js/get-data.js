const ACTION_PATH = "http://localhost:8000/";
//Fav and Watch lists paths
const FAV_LIST_PATH = "api/movies/favourites?accountId=";
const WATCH_LIST_PATH = "api/movies/watchlisted?accountId=";
//Review paths
const REVIEW_PATH = 'api/reviews/';
const GET_REVIEWS_BY_MOVIE_ID_PATH = ACTION_PATH+REVIEW_PATH+"byMovieId/";
const CREATE_REVIEW_PATH = ACTION_PATH+REVIEW_PATH;
const EDIT_REVIEW_PATH = ACTION_PATH+REVIEW_PATH;
const DELETE_REVIEW_PATH = ACTION_PATH+REVIEW_PATH;
//Data blocks
const FAV_LIST_BLOCK_ID = "favListBlock";
const WATCH_LIST_BLOCK_ID = "watchListBlock";
const REVIEW_LIST_BLOCK_ID = "reviewsBlock";
const CREATE_REVIEW_FORM_ID = "createReviewForm";
const UPDATE_REVIEW_FORM_ID = "updateReviewForm";
const NOTIFICATION_BLOCK_ID = "notificationBlock";
// For easy access to currently chosen movie's title
var SELECTED_MOVIE_TITLE = ""
// Various
const REFRESH_RATE_FAV_WATCH_BLOCKS = "3000"
const REFRESH_RATE_REVIEWS = "1500"

function refreshLists(data){
    clearBlocks();
    getWatchList(data);
    getFavList(data);
};

var notifyID;
function notify(message, color){
    clearTimeout(notifyID);
    if(color){
        document.getElementById(NOTIFICATION_BLOCK_ID).style.color = color;
    } else {
        document.getElementById(NOTIFICATION_BLOCK_ID).style.color = "black";
    }
    document.getElementById(NOTIFICATION_BLOCK_ID).innerText = message;
    notifyID = setTimeout(()=>{
        document.getElementById(NOTIFICATION_BLOCK_ID).innerText = "";
    }, REFRESH_RATE_FAV_WATCH_BLOCKS)
}

function getFavList(data){

    let favListPath = ACTION_PATH+FAV_LIST_PATH+JSON.parse(data).accountId;

    getAjax(favListPath, function(data, statusCode){
        if(statusCode === 200){
            const favListData = JSON.parse(data)
            printFavWatchLists(favListData, FAV_LIST_BLOCK_ID )
        } else {
            notify("Error getting favlist", "red")
        }
    });
}

function getWatchList(data){

    let watchListPath = ACTION_PATH+WATCH_LIST_PATH+JSON.parse(data).accountId;

    getAjax(watchListPath, function(data, statusCode){
        if(statusCode === 200){
            var watchListData = JSON.parse(data)
            printFavWatchLists(watchListData, WATCH_LIST_BLOCK_ID )
        }else {
            notify("Error getting watchlist", "red")
        }
    });
}

function clearAllBlocks(){
    clearBlocks();
    document.getElementById(REVIEW_LIST_BLOCK_ID).innerHTML = "";
    document.getElementById(CREATE_REVIEW_FORM_ID).innerHTML = "";
    document.getElementById(UPDATE_REVIEW_FORM_ID).innerHTML = "";
}

function clearBlocks(){
    document.getElementById(FAV_LIST_BLOCK_ID).innerHTML = "";
    document.getElementById(WATCH_LIST_BLOCK_ID).innerHTML = "";
}

function printFavWatchLists(listData, blockId ){

    var container = document.getElementById(blockId);
    var div = document.createElement('div');

    listData.forEach(function (movie) {
        var div2 = document.createElement('div');

        div2.textContent = 'Title: ' + movie.movieTitle + ', movieId: ' + movie.movieId + ', accountId: ' + movie.accountId;
        var button = document.createElement('button')
        button.innerText = "Review"
        SELECTED_MOVIE_TITLE = movie.movieTitle
        button.setAttribute('accountId', movie.accountId)
        button.setAttribute('movieId', movie.movieId)
        button.setAttribute('movieTitle', movie.movieTitle)
        button.addEventListener("click", showReviewsByMovieId)
        button.addEventListener("click", showCreateReviewForm)
        div2.appendChild(button)
        div.appendChild(div2);
    });
    container.appendChild(div);
}

var reviewIntervalID;
function showReviewsByMovieId(){    //COMPLETE
    let movieId = this.getAttribute('movieId')
    let accountId = this.getAttribute('accountId')
    let reviewsPath = GET_REVIEWS_BY_MOVIE_ID_PATH+movieId;

    document.getElementById(UPDATE_REVIEW_FORM_ID).innerHTML = "";
    var callback = ()=>{
        getAjax(reviewsPath, function(data, statusCode){
            if (statusCode === 200){
                var dataJSON = JSON.parse(data)
                printReviewsByMovieId(dataJSON, accountId, REVIEW_LIST_BLOCK_ID )
            } else {
                notify("Error while retrieving reviews", "red")
            }
        });
    }
    clearInterval(reviewIntervalID);
    callback();
    reviewIntervalID = setInterval(callback, REFRESH_RATE_REVIEWS);
}

function printReviewsByMovieId(reviewsListData, loggedUserId, blockId){

    var container = document.getElementById(blockId);
    container.innerHTML = "";

    var div = document.createElement('div');

    reviewsListData.forEach(function (review) {
        var div2 = document.createElement('div');
        div2.textContent = 'ReviewId: ' + review.id + ', ReviewBody: ' + review.content + ', accountId: ' + review.accountId;
        if(review.accountId == loggedUserId){
            // Edit Button
            var editButton = document.createElement('button')
            editButton.innerText = "Edit"
            editButton.setAttribute('accountId', loggedUserId)
            editButton.setAttribute('movieId', review.movieId)
            editButton.setAttribute('reviewId', review.id)
            editButton.setAttribute('content', review.content)
            editButton.addEventListener("click", showEditReviewForm)
            div2.appendChild(editButton)
            // Delete Button
            var deleteButton = document.createElement('button')
            deleteButton.innerText = "Delete"
            deleteButton.setAttribute('accountId', loggedUserId)
            deleteButton.setAttribute('movieId', review.movieId)
            deleteButton.setAttribute('reviewId', review.id)
            deleteButton.addEventListener("click", deleteReview)
            div2.appendChild(deleteButton)
        }
        div.appendChild(div2);
    });
    container.appendChild(div);
}

function showCreateReviewForm() {
    document.getElementById(UPDATE_REVIEW_FORM_ID).innerHTML = "";

    var movieId = this.getAttribute('movieId')
    var accountId = this.getAttribute('accountId')
    var movieTitle = this.getAttribute('movieTitle')

    // Hide Create Review Form if not hidden
    document.getElementById(CREATE_REVIEW_FORM_ID).classList.add("hideMe")

    var container = document.getElementById(CREATE_REVIEW_FORM_ID);
    container.innerHTML = ""

    container.classList.remove('hideMe')

    var div = document.createElement('div');
    div.textContent = 'Now you can create a review for: ' + movieTitle + ', with movieId: ' + movieId;

    var input = document.createElement('textarea')
    input.id = "reviewText"

    var createReviewButton = document.createElement('button');
    createReviewButton.innerText = "Create"
    createReviewButton.setAttribute('movieId', movieId)
    createReviewButton.setAttribute('accountId', accountId)

    createReviewButton.addEventListener('click',createReview)

    container.appendChild(div);
    container.appendChild(input);
    container.appendChild(createReviewButton);

    container.classList.remove('hideMe');
}


function showEditReviewForm() {

    let movieId = this.getAttribute('movieId')
    let accountId = this.getAttribute('accountId')
    let reviewId = this.getAttribute('reviewId')
    let content = this.getAttribute('content')

    var container = document.getElementById(UPDATE_REVIEW_FORM_ID);
    container.innerHTML = ""

    document.getElementById(CREATE_REVIEW_FORM_ID).classList.add('hideMe');

    var div = document.createElement('div');
    div.textContent = 'Edit your review for: ' + SELECTED_MOVIE_TITLE + ', with movieId: ' + movieId;

    var input = document.createElement('textarea')
    input.id = "editReviewText"
    input.value = content

    var editReviewButton = document.createElement('button');
    editReviewButton.innerText = "Update"
    editReviewButton.setAttribute('movieId', movieId)
    editReviewButton.setAttribute('accountId', accountId)
    editReviewButton.setAttribute('reviewId', reviewId)

    editReviewButton.addEventListener('click',editReview)

    container.appendChild(div);
    container.appendChild(input);
    container.appendChild(editReviewButton);

    container.classList.remove('hideMe');
}

function createReview(){

    let movieId = this.getAttribute('movieId')
    let reviewText = document.getElementById("reviewText").value

    postAjax(CREATE_REVIEW_PATH,  { review: reviewText, movieId: movieId } , function(data, statusCode){
        if (statusCode === 201){
            document.getElementById("reviewText").value = ""
            notify("Successfully created a review", "green")
        } else {
            if(data)
            {
                var dataJSON = JSON.parse(data)
                notify(dataJSON.error, "red")
            } else {
                notify("Unknown error while creating a review", "red")
            }
        }
    });
}

function editReview(){

    let movieId = this.getAttribute('movieId')
    let reviewId = this.getAttribute('reviewId')
    let editReviewText = document.getElementById("editReviewText").value

    putAjax(EDIT_REVIEW_PATH,  {reviewId: reviewId, review: editReviewText, movieId: movieId } , function(data, statusCode){
        if(statusCode === 200){
            notify(JSON.parse(data).message, "green")
            document.getElementById(UPDATE_REVIEW_FORM_ID).innerHTML = "";
            document.getElementById(CREATE_REVIEW_FORM_ID).classList.remove("hideMe")
        } else {
            if(data)
            {
                var dataJSON = JSON.parse(data)
                notify(dataJSON.error, "red")
            } else {
                notify("Unknown error while updating a review", "red")
            }
        }
    });
}

function deleteReview(){

    var reviewId = this.getAttribute('reviewId')

    deleteAjax(DELETE_REVIEW_PATH,  { reviewId: reviewId } , function(data, statusCode){
        if(statusCode === 200){
            notify("Review Deletion Success", "green");
            document.getElementById(CREATE_REVIEW_FORM_ID).classList.remove("hideMe")
            document.getElementById(UPDATE_REVIEW_FORM_ID).innerHTML = ""
        } else {
            if(data)
            {
                var dataJSON = JSON.parse(data)
                notify(dataJSON.error, "red")
            } else {
                notify("Unknown error while deleting a review", "red")
            }
        }
    });
}
