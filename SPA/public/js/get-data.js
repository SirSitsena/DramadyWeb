var ACTION_PATH = "http://localhost:8000/";
//Fav and Watch lists paths
var FAV_LIST_PATH = "api/movies/favourites?accountId=";
var WATCH_LIST_PATH = "api/movies/watchlisted?accountId=";
//Review paths
var GET_REVIEWS_BY_MOVIE_ID_PATH = "api/reviews/byTitleId/";
var REVIEW_PATH = 'api/reviews/';
//Data blocks
var FAV_LIST_BLOCK_ID = "favListBlock";
var WATCH_LIST_BLOCK_ID = "watchListBlock";
var REVIEW_LIST_BLOCK_ID = "reviewsBlock";
var CREATE_REVIEW_FORM_ID = "createReviewForm";
var UPDATE_REVIEW_FORM_ID = "updateReviewForm";

// For easy access of the currently chosen movie's title
var SELECTED_MOVIE_TITLE = ""

function getLists(data){

    // console.log('getlists');

    getWatchList(data);
    getFavList(data);

};

function getFavList(data){

    var favListPath = ACTION_PATH+FAV_LIST_PATH+JSON.parse(data).accountId;

    getAjax(favListPath, function(data){

        var favListData = JSON.parse(data)
        // console.log('getFavList:::');
        // console.log(favListData);

        printFavWatchLists(favListData, FAV_LIST_BLOCK_ID )
    });

}

function getWatchList(data){

    // console.log(JSON.parse(data).accountId);

    var watchListPath = ACTION_PATH+WATCH_LIST_PATH+JSON.parse(data).accountId;

    getAjax(watchListPath, function(data){

        var watchListData = JSON.parse(data)
        // console.log('getWatchList:::');
        // console.log(watchListData);

        printFavWatchLists(watchListData, WATCH_LIST_BLOCK_ID )
    });

}

function clearOnDelete(){
    document.getElementById(FAV_LIST_BLOCK_ID).innerHTML = "";
    document.getElementById(WATCH_LIST_BLOCK_ID).innerHTML = "";
    document.getElementById(REVIEW_LIST_BLOCK_ID).innerHTML = "";
    document.getElementById(CREATE_REVIEW_FORM_ID).innerHTML = "";
    document.getElementById(UPDATE_REVIEW_FORM_ID).innerHTML = "";
}

function printFavWatchLists(listData, blockId ){

    var container = document.getElementById(blockId);
    var div = document.createElement('div');

    listData.forEach(function (movie) {
        var div2 = document.createElement('div');

        div2.textContent = 'Title: ' + movie.movieTitle + ', titleId: ' + movie.titleId + ', accountId: ' + movie.accountId;
        var button = document.createElement('button')
        button.innerText = "Review"
        SELECTED_MOVIE_TITLE = movie.movieTitle
        button.setAttribute('accountId', movie.accountId)
        button.setAttribute('titleId', movie.titleId)
        button.setAttribute('movieTitle', movie.movieTitle)
        button.addEventListener("click", showReviewsBytitleId)
        button.addEventListener("click", showCreateReviewForm)
        div2.appendChild(button)
        div.appendChild(div2);
    });

    container.appendChild(div);

}

function showReviewsBytitleId(){
    var titleId = this.getAttribute('titleId')
    var accountId = this.getAttribute('accountId')
    // console.log(accountId)

    var reviewsPath = ACTION_PATH+GET_REVIEWS_BY_MOVIE_ID_PATH+titleId;

    getAjax(reviewsPath, function(data){

        var reviewsListData = JSON.parse(data)
        // console.log('reveiwsListData:::');
        // console.log(reviewsListData);

        printReviewsByTitleId(reviewsListData, accountId, REVIEW_LIST_BLOCK_ID )
    });

}

function refreshReviewsByTitleId(titleId, accountId){

    var reviewsPath = ACTION_PATH+GET_REVIEWS_BY_MOVIE_ID_PATH+titleId;

    getAjax(reviewsPath, function(data){
        if(data){
            var reviewsListData = JSON.parse(data)
            // console.log('reveiwsListData:::');
            // console.log(reviewsListData);
            // console.log("got the date from refresh")
            printReviewsByTitleId(reviewsListData, accountId, REVIEW_LIST_BLOCK_ID )
        }

    });
}

function printReviewsByTitleId(reviewsListData, loggedUserId, blockId){


    document.getElementById(UPDATE_REVIEW_FORM_ID).innerHTML = "";

    var container = document.getElementById(blockId);
    container.innerHTML = "";

    var div = document.createElement('div');

    reviewsListData.forEach(function (review) {
        var div2 = document.createElement('div');
        // console.log(review)
        div2.textContent = 'ReviewId: ' + review.id + ', ReviewBody: ' + review.content + ', accountId: ' + review.accountId;
        // console.log(review.accountId, loggedUserId)
        if(review.accountId == loggedUserId){

            // Edit Button
            var editButton = document.createElement('button')
            editButton.innerText = "Edit"
            editButton.setAttribute('accountId', loggedUserId)
            editButton.setAttribute('titleId', review.titleId)
            editButton.setAttribute('reviewId', review.id)
            editButton.setAttribute('content', review.content)
            editButton.addEventListener("click", showEditReviewForm)
            div2.appendChild(editButton)

            // Delete Button
            var deleteButton = document.createElement('button')
            deleteButton.innerText = "Delete"
            deleteButton.setAttribute('accountId', loggedUserId)
            deleteButton.setAttribute('titleId', review.titleId)
            deleteButton.setAttribute('reviewId', review.id)
            deleteButton.addEventListener("click", deleteReview)
            div2.appendChild(deleteButton)
        }

        div.appendChild(div2);
    });

    container.appendChild(div);
    // alert('Print Review')
}

function showCreateReviewForm() {

    var titleId = this.getAttribute('titleId')
    var accountId = this.getAttribute('accountId')
    var movieTitle = this.getAttribute('movieTitle')

    // Hide Create Review Form if not hidden
    document.getElementById(CREATE_REVIEW_FORM_ID).classList.add("hideMe")

    var container = document.getElementById(CREATE_REVIEW_FORM_ID);
    container.innerHTML = ""

    container.classList.remove('hideMe')

    var div = document.createElement('div');
    div.textContent = 'Now you can create a review for: ' + movieTitle + ', with titleId: ' + titleId;

    var input = document.createElement('textarea')
    input.id = "reviewText"

    var createReviewButton = document.createElement('button');
    createReviewButton.innerText = "Create"
    createReviewButton.setAttribute('titleId', titleId)
    createReviewButton.setAttribute('accountId', accountId)

    createReviewButton.addEventListener('click',createReview)

    container.appendChild(div);
    container.appendChild(input);
    container.appendChild(createReviewButton);

    container.classList.remove('hideMe');
}


function showEditReviewForm() {

    var titleId = this.getAttribute('titleId')
    var accountId = this.getAttribute('accountId')
    var movieTitle = this.getAttribute('movieTitle')
    var reviewId = this.getAttribute('reviewId')
    var content = this.getAttribute('content')


    var container = document.getElementById(UPDATE_REVIEW_FORM_ID);
    container.innerHTML = ""

    document.getElementById(CREATE_REVIEW_FORM_ID).classList.add('hideMe');

    var div = document.createElement('div');
    div.textContent = 'Edit your review for: ' + SELECTED_MOVIE_TITLE + ', with titleId: ' + titleId;

    var input = document.createElement('textarea')
    input.id = "editReviewText"
    input.value = content

    var editReviewButton = document.createElement('button');
    editReviewButton.innerText = "Update"
    editReviewButton.setAttribute('titleId', titleId)
    editReviewButton.setAttribute('accountId', accountId)
    editReviewButton.setAttribute('reviewId', reviewId)


    editReviewButton.addEventListener('click',editReview)

    container.appendChild(div);
    container.appendChild(input);
    container.appendChild(editReviewButton);

    container.classList.remove('hideMe');
}

function createReview(){

    var createReviewPath = ACTION_PATH+REVIEW_PATH;

    var titleId = this.getAttribute('titleId')
    var accountId = this.getAttribute('accountId')
    var reviewText = document.getElementById("reviewText").value


    // postAjax(createReviewPath,  { accountId: accountId, review: reviewText, titleId: titleId } , function(data){
    postAjax(createReviewPath,  { review: reviewText, titleId: titleId } , function(data){
        if(data){
            console.log("Review Creation Success")
            // Clear input field for create
            document.getElementById("reviewText").value = ""
        }
    });
    // Clear input field for create
    document.getElementById("reviewText").value = ""

    setTimeout(()=>{
        refreshReviewsByTitleId(titleId, accountId)
    }, 500)

}

function editReview(){

    var titleId = this.getAttribute('titleId')
    var accountId = this.getAttribute('accountId')
    var reviewId = this.getAttribute('reviewId')
    var editReviewText = document.getElementById("editReviewText").value

    var editReviewPath = ACTION_PATH+REVIEW_PATH;
    // Show Create Review Form after editing an existing one

    var createReviewForm = document.getElementById(CREATE_REVIEW_FORM_ID)
    createReviewForm.classList.remove("hideMe")

    // putAjax(editReviewPath,  {reviewId: reviewId, accountId: accountId, review: editReviewText, titleId: titleId } , function(data){
    putAjax(editReviewPath,  {reviewId: reviewId, review: editReviewText, titleId: titleId } , function(data){
        if(data){
            console.log("Review Creation Success")
        }
    });
    setTimeout(()=>{
        refreshReviewsByTitleId(titleId, accountId)
    }, 500)
}

function deleteReview(){

    var titleId = this.getAttribute('titleId')
    var accountId = this.getAttribute('accountId')
    var reviewId = this.getAttribute('reviewId')

    var deleteReviewPath = ACTION_PATH+REVIEW_PATH;

    deleteAjax(deleteReviewPath,  { reviewId: reviewId, accountId: accountId } , function(data){
    // deleteAjax(deleteReviewPath,  { reviewId: reviewId } , function(data){
        if(data){
            console.log("Review Deletion Success")
            // refreshReviewsBytitleId(titleId, userId)
        }
    });
    setTimeout(()=>{
        refreshReviewsByTitleId(titleId, accountId)
    }, 500)

}
