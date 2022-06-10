document.addEventListener("DOMContentLoaded", function(){

    var signInButton = document.getElementById("user-sign-in");
    var signUpForm = document.querySelector('.sign-up-form');
    var signInForm = document.querySelector('.sign-in-form');
    var signOutButton = document.getElementById("signout-button");
    var signUpButton = document.getElementById("sign-up-button");
    var intervalID;

    var ACTION_PATH = "http://localhost:8000/";

    function login(){

        var login = document.getElementById("user-sign-in-name").value;
        var password  =document.getElementById("user-sign-in-password").value;
        var loginPath = ACTION_PATH+'api/accounts/tokens';

        postAjax(loginPath,  { username: login, password: password, grant_type:'password' } , function(data, statusCode){
            var dataJSON = JSON.parse(data)
            if (statusCode === 200){
                notify(dataJSON.message)
                if(dataJSON.isLoggedIn){
                    successFullAjax(data);
                }
            } else {
                notify(dataJSON.error)
            }
        });
    };

    function logout(){

        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        clearAllBlocks();

        clearInterval(intervalID);

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');
        signOutButton.classList.add('hideMe');

        notify("Successfully logged out!")
    }

    function userRegister(){


        registerPath = ACTION_PATH+'api/accounts';


        var loginNew = document.getElementById("user-sign-up-username").value;
        var passwordNew = document.getElementById("user-sign-up-password").value;
        var fullname = document.getElementById("user-sign-up-fullname").value;

        postAjax(registerPath,  { username: loginNew, fullname: fullname, password: passwordNew } , function(data, statusCode){
            var dataJSON = JSON.parse(data)

            if (statusCode === 200){
                notify(dataJSON.message)
                if(dataJSON.isLoggedIn){
                    document.getElementById("user-sign-up-username").value = ""
                    document.getElementById("user-sign-up-password").value = ""
                    document.getElementById("user-sign-up-fullname").value = ""
                    successFullAjax(data);
                }
            } else {
                notify(dataJSON.error)
            }
        });

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');
    }

    function successFullAjax(data){

        afterLogin();
        refreshLists(data);
        clearInterval(intervalID);
        intervalID = setInterval(()=>{
            refreshLists(data)
            }, 2000);
    }

    function afterLogin(){
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

})