document.addEventListener("DOMContentLoaded", function(){

    var signInButton = document.getElementById("user-sign-in");
    var signUpForm = document.querySelector('.sign-up-form');
    var signInForm = document.querySelector('.sign-in-form');
    var signOutButton = document.getElementById("signout-button");
    var signUpButton = document.getElementById("sign-up-button");

    var ACTION_PATH = "http://localhost:8000/";

    function login(){

        var login = document.getElementById("user-sign-in-name").value;
        var password  =document.getElementById("user-sign-in-password").value;
        var loginPath = ACTION_PATH+'api/accounts/tokens';

        postAjax(loginPath,  { username: login, password: password, grant_type:'password' } , function(data){
            // console.log("This is data")
            // console.log(data);
            if( JSON.parse(data).isLoggedIn == true ){
                // should be in callback function after ajax success or in it
                // console.log(JSON.parse(data).accountId)
                successFullAjax(data);
            }
        });

        // console.log('login');
        // console.log('login is'+login);
        // console.log('password is'+password);

        // checkCookie();

    };

    function logout(){

        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        clearOnDelete();

        // logoutPath = ACTION_PATH+'api/accounts/sign-out';
        //
        // postAjax(logoutPath,  false , function(data){
        //
        //     if(JSON.parse(data).message == "Signed out"){
        //
        //         // alert("Signed out");
        //         document.location.href="/";
        //     }
        //
        //
        // });

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');
        signOutButton.classList.add('hideMe');

    }

    function userRegister(){


        registerPath = ACTION_PATH+'api/accounts';


        var loginNew = document.getElementById("user-sign-up-username").value;
        var passwordNew = document.getElementById("user-sign-up-password").value;
        var fullname = document.getElementById("user-sign-up-fullname").value;

        postAjax(registerPath,  { username: loginNew, fullname: fullname, password: passwordNew } , function(data){

            // console.log(data);
            if( JSON.parse(data).isLoggedIn == true ){

                successFullAjax(data);

            }

        });

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');

    }

    function successFullAjax(data){

        afterLogin();
        getLists(data);
    }

    function afterLogin(){

        // console.log('afterLogin');
        hideSignUp();

    };

    function hideSignUp(){

        signOutButton.classList.remove('hideMe');
        signUpForm.classList.add('hideMe');
        signInForm.classList.add('hideMe');


    }

    signInButton.addEventListener('click' , login);

    signOutButton.addEventListener('click' , logout);

    signUpButton.addEventListener('click' , userRegister);

    signOutButton.classList.add('hideMe');

    // console.log('AUTH FILE')

})