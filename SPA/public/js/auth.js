document.addEventListener("DOMContentLoaded", function(){

    const signInButton = document.getElementById("user-sign-in");
    const signUpForm = document.querySelector('.sign-up-form');
    const signInForm = document.querySelector('.sign-in-form');
    const signOutButton = document.getElementById("signout-button");
    const signUpButton = document.getElementById("sign-up-button");

    const ACTION_PATH = "http://localhost:8000/";
    const REGISTER_PATH = ACTION_PATH+'api/accounts';

    function login(){

        let login = document.getElementById("user-sign-in-name").value;
        let password  =document.getElementById("user-sign-in-password").value;
        let loginPath = ACTION_PATH+'api/accounts/tokens';

        postAjax(loginPath,  { username: login, password: password, grant_type:'password' } , function(data, statusCode){
            const dataJSON = JSON.parse(data)
            if (statusCode === 200){
                notify(dataJSON.message, "green")
                if(dataJSON.isLoggedIn){
                    successFullAjax(data);
                }
            } else {
                notify(dataJSON.error, "red")
            }
        });
    };

    function logout(){

        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        clearAllBlocks();
        clearInterval(intervalID);
        clearInterval(reviewIntervalID);
        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');
        signOutButton.classList.add('hideMe');

        notify("Successfully logged out!", "green")
    }

    function userRegister(){

        let loginNew = document.getElementById("user-sign-up-username").value;
        let passwordNew = document.getElementById("user-sign-up-password").value;
        let fullname = document.getElementById("user-sign-up-fullname").value;

        postAjax(REGISTER_PATH,  { username: loginNew, fullname: fullname, password: passwordNew } , function(data, statusCode){
            const dataJSON = JSON.parse(data)

            if (statusCode === 200){
                notify(dataJSON.message, "green")
                if(dataJSON.isLoggedIn){
                    document.getElementById("user-sign-up-username").value = ""
                    document.getElementById("user-sign-up-password").value = ""
                    document.getElementById("user-sign-up-fullname").value = ""
                    successFullAjax(data);
                }
            } else {
                notify(dataJSON.error, "red")
            }
        });

        signUpForm.classList.remove('hideMe');
        signInForm.classList.remove('hideMe');
    }

    var intervalID;
    function successFullAjax(data){
        afterLogin();
        refreshLists(data);
        clearInterval(intervalID);
        intervalID = setInterval(()=>{
            refreshLists(data)
            }, REFRESH_RATE_FAV_WATCH_BLOCKS);
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