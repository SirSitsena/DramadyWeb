
    var ACTION_PATH = "http://localhost:8000/";
    //Fav and Watch lists paths
    var FAV_LIST_PATH = "api/movies/favourites/";
    var WATCH_LIST_PATH = "api/movies/watchlisted/";
    //Review paths
    var GET_REVIEWS_BY_MOVIE_ID_PATH = "api/reviews/byTitleId/";
    var EDIT_REVIEW_PATH = 'api/reviews/update/';
    var CREATE_REVIEW_PATH = 'api/reviews/create';
    var DELETE_REVIEW_PATH = 'api/reviews/delete/';

    // For easy access of the currently chosen movie's title
    var SELECTED_MOVIE_TITLE = ""

    // for later times

    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');
    //     for(let i = 0; i <ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }
    //
    // function checkCookie() {
    //     let username = getCookie("username")
    //     if (username != "") {
    //         alert("Welcome again " + username);
    //     }else {
    //         username = prompt("Please enter your name:", "")
    //       if (username != "" && username != null) {
    //         setCookie("username", username, 365);
    //       }
    //     }
    //   }
    //
    // function setCookie(cname, cvalue, exdays) {
    //     const d = new Date();
    //     d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //     let expires = "expires="+ d.toUTCString();
    //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // }


    //--------------------------------------------------------------


    function getLists(data){

        console.log('getlists');

        getWatchList(data);
        getFavList(data);

    };

    function getFavList(data){


        var favListPath = ACTION_PATH+FAV_LIST_PATH+JSON.parse(data).accountId;

        getAjax(favListPath, function(data){

            var favListData = JSON.parse(data)
            console.log('getFavList:::');
            console.log(favListData);

            printFavWatchLists(favListData, 'favListBlock' )
        });

    }

    function getWatchList(data){
        console.log(JSON.parse(data).accountId);
        var watchListPath = ACTION_PATH+WATCH_LIST_PATH+JSON.parse(data).accountId;

        getAjax(watchListPath, function(data){

            var watchListData = JSON.parse(data)
            console.log('getWatchList:::');
            console.log(watchListData);

            printFavWatchLists(watchListData, 'watchListBlock' )
        });

    }

    function printFavWatchLists(listData, blockId ){

        var container = document.getElementById(blockId);
        var div = document.createElement('div');

        listData.forEach(function (movie) {
            var div2 = document.createElement('div');

            div2.textContent = 'Title: ' + movie.movieTitle + ', movieId: ' + movie.movieId + ', userId: ' + movie.userId;
            var button = document.createElement('button')
            button.innerText = "Review"
            SELECTED_MOVIE_TITLE = movie.movieTitle
            button.setAttribute('userId', movie.userId)
            button.setAttribute('movieId', movie.movieId)
            button.setAttribute('movieTitle', movie.movieTitle)
            button.addEventListener("click", showReviewsByMovieId)
            button.addEventListener("click", showCreateReviewForm)
            div2.appendChild(button)
            div.appendChild(div2);
        });

        container.appendChild(div);

    }

    function showReviewsByMovieId(){
        var movieId = this.getAttribute('movieId')
        var userId = this.getAttribute('userId')

        var reviewsPath = ACTION_PATH+GET_REVIEWS_BY_MOVIE_ID_PATH+movieId;

        getAjax(reviewsPath, function(data){

            var reviewsListData = JSON.parse(data)
            console.log('reveiwsListData:::');
            console.log(reviewsListData);

            printReviewsByMovieId(reviewsListData, userId, 'reviewsBlock' )
        });

    }

    function refreshReviewsByMovieId(movieId, userId){

        var reviewsPath = ACTION_PATH+GET_REVIEWS_BY_MOVIE_ID_PATH+movieId;

        getAjax(reviewsPath, function(data){
            if(data){
                var reviewsListData = JSON.parse(data)
                console.log('reveiwsListData:::');
                console.log(reviewsListData);
                console.log("got the date from refresh")
                printReviewsByMovieId(reviewsListData, userId, 'reviewsBlock' )
            }

        });
    }

    function printReviewsByMovieId(reviewsListData, loggedUserId, blockId){


        var container = document.getElementById('updateReviewForm');
        container.innerHTML = ""

        var container = document.getElementById(blockId);
        container.innerHTML = "";

        var div = document.createElement('div');

        reviewsListData.forEach(function (review) {
            var div2 = document.createElement('div');

            div2.textContent = 'ReviewId: ' + review.id + ', ReviewBody: ' + review.content + ', UserId: ' + review.userId;

            if(review.userId == loggedUserId){

                // Edit Button
                var editButton = document.createElement('button')
                editButton.innerText = "Edit"
                editButton.setAttribute('userId', loggedUserId)
                editButton.setAttribute('movieId', review.titleId)
                editButton.setAttribute('reviewId', review.id)
                editButton.setAttribute('content', review.content)
                editButton.addEventListener("click", showEditReviewForm)
                div2.appendChild(editButton)

                // Delete Button
                var deleteButton = document.createElement('button')
                deleteButton.innerText = "Delete"
                deleteButton.setAttribute('userId', loggedUserId)
                deleteButton.setAttribute('movieId', review.titleId)
                deleteButton.setAttribute('reviewId', review.id)
                deleteButton.addEventListener("click", deleteReview)
                div2.appendChild(deleteButton)
            }

            div.appendChild(div2);
        });

        container.appendChild(div);
        // alert('Print Review')
    }

    function editReview(){

        var movieId = this.getAttribute('movieId')
        var userId = this.getAttribute('userId')
        var reviewId = this.getAttribute('reviewId')
        var editReviewText = document.getElementById("editReviewText").value

        var editReviewPath = ACTION_PATH+EDIT_REVIEW_PATH+reviewId;
        // Show Create Review Form after editing an existing one

        var createReviewForm = document.getElementById('createReviewForm')
        createReviewForm.classList.remove("hideMe")


        var editReviewText = document.getElementById("editReviewText").value

        postAjax(editReviewPath,  {reviewId: reviewId, accountId: userId, review: editReviewText, titleId: movieId } , function(data){
            if(data){
                console.log("Review Creation Success")

            }

        });
        setTimeout(()=>{
            refreshReviewsByMovieId(movieId, userId)
        }, 500)
    }


    function showCreateReviewForm() {

        var movieId = this.getAttribute('movieId')
        var userId = this.getAttribute('userId')
        var movieTitle = this.getAttribute('movieTitle')

        // Hide Create Review Form if not hidden
        var createReviewForm = document.getElementById("createReviewForm")
        createReviewForm.classList.add("hideMe")

        var container = document.getElementById('createReviewForm');
        container.innerHTML = ""

        container.classList.remove('hideMe')

        var div = document.createElement('div');
        div.textContent = 'Now you can create a review for: ' + movieTitle + ', with movieId: ' + movieId;

        var input = document.createElement('textarea')
        input.id = "reviewText"

        var createReviewButton = document.createElement('button');
        createReviewButton.innerText = "Create"
        createReviewButton.setAttribute('movieId', movieId)
        createReviewButton.setAttribute('userId', userId)

        createReviewButton.addEventListener('click',createReview)

        container.appendChild(div);
        container.appendChild(input);
        container.appendChild(createReviewButton);

        container.classList.remove('hideMe');
    }

    function showEditReviewForm() {

        var movieId = this.getAttribute('movieId')
        var userId = this.getAttribute('userId')
        var movieTitle = this.getAttribute('movieTitle')
        var reviewId = this.getAttribute('reviewId')
        var content = this.getAttribute('content')


        var container = document.getElementById('updateReviewForm');
        container.innerHTML = ""

        var createContainer = document.getElementById('createReviewForm');
        createContainer.classList.add('hideMe')

        var div = document.createElement('div');
        div.textContent = 'Edit your review for: ' + SELECTED_MOVIE_TITLE + ', with movieId: ' + movieId;

        var input = document.createElement('textarea')
        input.id = "editReviewText"
        input.value = content

        var editReviewButton = document.createElement('button');
        editReviewButton.innerText = "Update"
        editReviewButton.setAttribute('movieId', movieId)
        editReviewButton.setAttribute('userId', userId)
        editReviewButton.setAttribute('reviewId', reviewId)


        editReviewButton.addEventListener('click',editReview)

        container.appendChild(div);
        container.appendChild(input);
        container.appendChild(editReviewButton);

        container.classList.remove('hideMe');
    }

    function createReview(){

        var createReviewPath = ACTION_PATH+CREATE_REVIEW_PATH;

        var movieId = this.getAttribute('movieId')
        var userId = this.getAttribute('userId')
        var reviewText = document.getElementById("reviewText").value


        postAjax(createReviewPath,  { accountId: userId, review: reviewText, titleId: movieId } , function(data){
            if(data){
                console.log("Review Creation Success")
                // Clear input field for create
                document.getElementById("reviewText").value = ""
            }
        });
        // Clear input field for create
        document.getElementById("reviewText").value = ""

        setTimeout(()=>{
            refreshReviewsByMovieId(movieId, userId)
        }, 500)

    }

    function deleteReview(){

        var movieId = this.getAttribute('movieId')
        var userId = this.getAttribute('userId')
        var reviewId = this.getAttribute('reviewId')

        var deleteReviewPath = ACTION_PATH+DELETE_REVIEW_PATH+reviewId;

        postAjax(deleteReviewPath,  { reviewId: reviewId, accountId: userId } , function(data){
            if(data){
                console.log("Review Deletion Success")
                // refreshReviewsByMovieId(movieId, userId)
            }

        });
        setTimeout(()=>{
            refreshReviewsByMovieId(movieId, userId)
        }, 500)

    }

//################# IMPORTANT PART, BETTER IF NEVER xD
// main functions start here
//   for later times
//    function getUserByTokenFromRest(tokens){
//     var autoSignInPath = ACTION_PATH+'api/get-user';
//     postAjax(autoSignInPath,  { tokens: tokens} , function(data){
//            return data;
//     });
//    }
    // function signInUser(tokens){
    //     var user =  getUserByTokenFromRest(tokens);
    //     var login = user.username;
    //     var password  =user.password;
    //     var autoSignInPath = ACTION_PATH+'api/tokens';
    //     postAjax(autoSignInPath,  { username: login, password: password, grant_type: 'password' } , function(data){
    //         console.log(data);
    //         successFullAjax();
    //     });
    //  }
    //#########################