const popup = document.querySelector('.popup');
const loginButton = document.querySelector('.login-btn');
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
    popup.style.display = 'none';
    popupBackground.style.display = 'none';
    content.style.zIndex = '1';
    e.preventDefault();
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