
document.addEventListener("DOMContentLoaded", function(){

    var signInButton = document.getElementById("user-sign-in");
    var signUpForm = document.querySelector('.sign-up-form');
    var signInForm = document.querySelector('.sign-in-form');
    var signOutButton = document.getElementById("signout-button");
    var signUpButton = document.getElementById("sign-up-button");
    var actionPath = "http://localhost:8000/";
    var selectedMovie = ""

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

    function getAjax(url, success) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }


    function postAjax(url, data, success) {
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.withCredentials = true;
        xhr.open('POST', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        return xhr;
    }


    function successFullAjax(data){

        afterLogin();
        getLists(data);

    }


    function afterLogin(){


        console.log('afterLogin');
        hideSignUp();

    };

    function getLists(data){

        console.log('getlists');

        getWatchList(data);
        getFavList(data);

    };


    function getFavList(data){


        var favListPath = actionPath+'api/movies/favourites/'+JSON.parse(data).accountId;

        getAjax(favListPath, function(data){

            var favListData = JSON.parse(data)
            console.log('getFavList:::');
            console.log(favListData);

            printFavWatchLists(favListData, 'favListBlock' )
        });

    }

    function getWatchList(data){
        console.log(JSON.parse(data).accountId);
        var watchListPath = actionPath+'api/movies/watchlisted/'+JSON.parse(data).accountId;

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
            selectedMovie = movie.movieTitle
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

        var reviewsPath = actionPath+'api/reviews/byTitleId/'+movieId;

        getAjax(reviewsPath, function(data){

            var reviewsListData = JSON.parse(data)
            console.log('reveiwsListData:::');
            console.log(reviewsListData);

            printReviewsByMovieId(reviewsListData, userId, 'reviewsBlock' )
        });

    }

    function refreshReviewsByMovieId(movieId, userId){

        var reviewsPath = actionPath+'api/reviews/byTitleId/'+movieId;

        getAjax(reviewsPath, function(data){

            var reviewsListData = JSON.parse(data)
            console.log('reveiwsListData:::');
            console.log(reviewsListData);

            printReviewsByMovieId(reviewsListData, userId, 'reviewsBlock' )
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
                deleteButton.setAttribute('movieId', review.movieId)
                editButton.setAttribute('reviewId', review.id)
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

        var editReviewPath = actionPath+'api/reviews/update/'+reviewId;
        // Show Create Review Form after editing an existing one

        var createReviewForm = document.getElementById('createReviewForm')
        createReviewForm.classList.remove("hideMe")


        var editReviewText = document.getElementById("editReviewText").value

        postAjax(editReviewPath,  {reviewId: reviewId, accountId: userId, review: editReviewText, titleId: movieId } , function(data){
            if(data){
                console.log("Review Creation Success")

            }

        });
        refreshReviewsByMovieId(movieId, userId)
        refreshReviewsByMovieId(movieId, userId)
        refreshReviewsByMovieId(movieId, userId)
        refreshReviewsByMovieId(movieId, userId)
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
        div.textContent = 'Edit your review for: ' + selectedMovie + ', with movieId: ' + movieId;

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

        var createReviewPath = actionPath+'api/reviews/create';

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
        refreshReviewsByMovieId(movieId, userId)
        refreshReviewsByMovieId(movieId, userId)
        refreshReviewsByMovieId(movieId, userId)
        refreshReviewsByMovieId(movieId, userId)

    }

    function deleteReview(){

        var movieId = this.getAttribute('movieId')
        var userId = this.getAttribute('userId')

        var deleteReviewPath = actionPath+'api/reviews/byTitleId/'+movieId;

        getAjax(reviewsPath, function(data){

            var reviewsListData = JSON.parse(data)
            console.log('reveiwsListData:::');
            console.log(reviewsListData);

            printReviewsByMovieId(reviewsListData, userId, 'reviewsBlock' )
        });

        alert("DeleteReviewButtonPressed")
    }


    function hideSignUp(){

        signOutButton.classList.remove('hideMe');
        signUpForm.classList.add('hideMe');
        signInForm.classList.add('hideMe');


    }


//################# IMPORTANT PART, BETTER IF NEVER xD
// main functions start here
//   for later times
//    function getUserByTokenFromRest(tokens){
//     var autoSignInPath = actionPath+'api/get-user';
//     postAjax(autoSignInPath,  { tokens: tokens} , function(data){
//            return data;
//     });
//    }
    // function signInUser(tokens){
    //     var user =  getUserByTokenFromRest(tokens);
    //     var login = user.username;
    //     var password  =user.password;
    //     var autoSignInPath = actionPath+'api/tokens';
    //     postAjax(autoSignInPath,  { username: login, password: password, grant_type: 'password' } , function(data){
    //         console.log(data);
    //         successFullAjax();
    //     });
    //  }
    //#########################

    function login(){

        var login = document.getElementById("user-sign-in-name").value;
        var password  =document.getElementById("user-sign-in-password").value;
        var loginPath = actionPath+'api/accounts/tokens';

        postAjax(loginPath,  { username: login, password: password, grant_type:'password' } , function(data){
            console.log("test")
            console.log("data: ", data);
            if( JSON.parse(data).isLoggedIn == true ){
                // should be in callback function after ajax success or in it
                console.log(JSON.parse(data).accountId)
                successFullAjax(data);
            }
        });

        console.log('login');
        console.log('login is'+login);
        console.log('password is'+password);

        // checkCookie();

    };



    function logout(){


        logoutPath = actionPath+'api/accounts/sign-out';

        postAjax(logoutPath,  false , function(data){

            if(JSON.parse(data).message == "Signed out"){

                // alert("Signed out");
                document.location.href="/";
            }


        });

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');
        signOutButton.classList.add('hideMe');

    }


    function userRegister(){


        registerPath = actionPath+'api/accounts/sign-up';


        var loginNew = document.getElementById("user-sign-up-username").value;
        var passwordNew = document.getElementById("user-sign-up-password").value;
        var fullname = document.getElementById("user-sign-up-fullname").value;

        postAjax(registerPath,  { username: loginNew, fullname: fullname, password: passwordNew } , function(data){

            console.log(data);
            if( JSON.parse(data).isLoggedIn == true ){

                successFullAjax();

            }

        });

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');

    }



    signInButton.addEventListener('click' , login);

    signOutButton.addEventListener('click' , logout);

    signUpButton.addEventListener('click' , userRegister);

    signOutButton.classList.add('hideMe');

})