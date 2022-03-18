document.addEventListener("DOMContentLoaded", function(){

    var signInButton = document.getElementById("user-sign-in");
    var signUpForm = document.querySelector('.sign-up-form');
    var signInForm = document.querySelector('.sign-in-form');
    var signOutButton = document.getElementById("signout-button");
    var signUpButton = document.getElementById("sign-up-button");
    var actionPath = "http://localhost:8000/";



    // for later times

    // function checkCookie() {

    //     var tokens = getCookie("tokens");
    //     if (tokens != "") {

    //         signInUser(tokens)

    //     }else {
    //         tokens = prompt("Please enter your token:", "");
    //       if (tokens != "" && tokens != null) {
    //         setCookie("tokens", tokens, 365);
    //       }
    //     }
    //   }

    // checkCookie();

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
        xhr.open('POST', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        return xhr;
    }


    function successFullAjax(){

        afterLogin();
        getUserData();

    }


    function afterLogin(){


        console.log('afterLogin');
        hideSignUp();

    };

    function getUserData(){

        console.log('getuserdata');

        getMovies();

    };

    function getMovies(){

        var movieListPath = actionPath+'api/movies';

        getAjax(movieListPath, function(data){

            console.log('movies:::' + data);


        });

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
        var loginPath = actionPath+'api/tokens';

        postAjax(loginPath,  { username: login, password: password, grant_type: 'password' } , function(data){
            console.log(data);
            if( JSON.parse(data).isLoggedIn == true ){
                // should be in callback function after ajax success or in it

                successFullAjax(data);

            }

        });

        console.log('login');
        console.log('login is'+login);
        console.log('password is'+password);


    };



    function logout(){


        logoutPath = actionPath+'api/sign-out';

        postAjax(logoutPath,  false , function(data){

            if(JSON.parse(data).message == "Signed out"){

                alert("Signed out");

            }


        });

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');

    }


    function userRegister(){


        registerPath = actionPath+'api/sign-up';


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