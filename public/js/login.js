// firebase authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAb7HACiJd16gpmh-4uZz0m1bd6qmNRbjE",
    authDomain: "public-transportation-gu-bdeed.firebaseapp.com",
    projectId: "public-transportation-gu-bdeed",
    storageBucket: "public-transportation-gu-bdeed.appspot.com",
    messagingSenderId: "704436761029",
    appId: "1:704436761029:web:1a09532a254ea028a15bac",
    measurementId: "G-5HVLYKW6QB",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
// end of firebase authentication







const popup = document.querySelector('.popup');
const loginButton = document.querySelector('#login');
const signupButton = document.querySelector('#register');
const popupBackground = document.querySelector('.popup-background');
const content = document.querySelector('.content');
const loginTab = document.querySelector('.login-tab');
const signupTab = document.querySelector('.signup-tab');
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const anchorLogin = document.querySelector('.anchor-login');
const anchorSignup = document.querySelector('.anchor-signup');

var loginTabClicked = false;
var signupTabClicked = false;

window.addEventListener('load', showPopup);
window.addEventListener('load', showLoginTab);
loginButton.addEventListener('click', cancelPopup);
signupButton.addEventListener('click', verificationMessage);
loginTab.addEventListener('click', showLoginTab);
signupTab.addEventListener('click', showSignupTab);
anchorLogin.addEventListener('click', showLoginTab);
anchorSignup.addEventListener('click', showSignupTab);


popup.style.display = 'none';
popupBackground.style.display='none';

function showPopup(){
    setTimeout(() => {
        popup.style.display='';
        popupBackground.style.display='';
    }, 2000);
}
function cancelPopup(e){
   if(auth.currentUser.emailVerified == true){
    var email = document.querySelector("#login-email").value;
    var password = document.querySelector("#login-password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // console.log(auth.currentUser.emailVerified);
        // alert(user.email + "login successfully");
        // document.querySelector("#logout").style.display = "block";
        popup.style.display = 'none';
        popupBackground.style.display = 'none';
        content.style.zIndex = '1';
        e.preventDefault();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        alert(errorCode.substring(5));
      });
   }else{
    alert("please verify your email");
   }
}
function verificationMessage(e){
    var email = document.querySelector("#signup-email").value;
    var password = document.querySelector("#signup-password").value;
    var firstName = document.querySelector("#FisrtName").value;
    var lastName = document.querySelector("#LastName").value;
    var phoneNumber = document.querySelector("#PhoneNum").value;
    // for new registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // verification
        sendEmailVerification(user).then(() => {
          console.log("verification is sent");
          alert("verification is sent");
        });
        console.log(user);
        alert("Registration successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // alert(errorCode.substring(5));
        if(email == "" || password=="" ||  firstName=="" || lastName=="" || phoneNumber==""){
            alert("please fill in the required data");
        }else if(errorCode.substring(5) == "missing-email"){
            alert("Missing Email !");
        }else if (errorCode.substring(5) == "email-already-in-use"){
            alert("This Email is already signed up");
        }else if (errorCode.substring(5) == "weak-password"){
            alert("Weak Password !");
        }
      });
}
function showLoginTab(e){
    loginTabClicked = true;
    signupTabClicked = false;
    if(loginTabClicked === true){
        loginTab.style.borderBottom = '2px solid green';
        signupTab.style.borderBottom = '';
        signupForm.style.display ='none';
        loginForm.style.display = '';
    }
    e.preventDefault();
}
function showSignupTab(e){
    signupTabClicked = true;
    loginTabClicked = false;
    if(signupTabClicked === true){
        signupTab.style.borderBottom = '2px solid green';
        loginTab.style.borderBottom = '';
        signupForm.style.display ='';
        loginForm.style.display = 'none';
    }
    e.preventDefault();
}