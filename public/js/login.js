// firebase authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
  import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
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

// firestore
const db = getFirestore(app);



function showPopup(){
  popup.style.display = 'none';
popupBackground.style.display='none';
    setTimeout(() => {
        popup.style.display='';
        popupBackground.style.display='';
    }, 2000);
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
const showApp = () => {
  popup.style.display = 'none';
  popupBackground.style.display = 'none';
  content.style.zIndex = '1';
  // e.preventDefault();
}

const loginEmailPassword = async (e) => {
  var email = document.querySelector("#login-email").value;
  var password = document.querySelector("#login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password)
    if(auth.currentUser.emailVerified == true){
      popup.style.display = 'none';
      popupBackground.style.display = 'none';
      content.style.zIndex = '1';
    }else{
      alert("please verify your email");
      e.preventDefault();
    }
  }
  catch(error) {
    // alert(`There was an error: ${error}`)
    if(error.code.substring(5)=="invalid-email"){
      loginEmailPlaceholder.setAttribute('placeholder', "بريد الكتروني خاطئ");
      loginEmailPlaceholder.style.borderColor = "rgb(194, 3, 3)";
    }else if(error.code.substring(5)=="internal-error"  || error.code.substring(5)=="wrong-password"){
      loginPasswordPlaceholder.value = "";
      loginPasswordPlaceholder.setAttribute('placeholder', "باسورد خاطئ");
      loginPasswordPlaceholder.style.borderColor = "rgb(194, 3, 3)";
    }
  }
}
const createAccount = async () => {
    var email = document.querySelector("#signup-email").value;
    var password = document.querySelector("#signup-password").value;
    var firstName = document.querySelector("#FisrtName").value;
    var lastName = document.querySelector("#LastName").value;
    var phoneNumber = document.querySelector("#PhoneNum").value;
// create account
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    sendEmailVerification(auth.currentUser);
    alert("verification is sent, check your Email");
    showPopup();
  }
  catch(error) {
    // alert(`There was an error: ${error}`)
    if(error == "FirebaseError: Firebase: Error (auth/invalid-email)."){
      signupEmailPlaceholder.setAttribute('placeholder', "برجاء ادخال بريد الكتروني");
      signupEmailPlaceholder.style.borderColor = "rgb(194, 3, 3)";
      signupPasswordPlaceholder.value = "";
      signupPasswordPlaceholder.setAttribute('placeholder', "برجاء ادخال باسورد");
      signupPasswordPlaceholder.style.borderColor = "rgb(194, 3, 3)";
      firstNamePlaceholder.setAttribute('placeholder', "برجاء كتابة الاسم الاول");
      lastNamePlaceholder.setAttribute('placeholder', "برجاء كتابة الكنية");
      phoneNumberPlaceholder.setAttribute('placeholder', "برجاء كتابة رقم الموبايل");
      firstNamePlaceholder.style.borderColor = "rgb(194, 3, 3)";
      lastNamePlaceholder.style.borderColor = "rgb(194, 3, 3)";
      phoneNumberPlaceholder.style.borderColor = "rgb(194, 3, 3)";
    }
    else if(error.code.substring(5)=="invalid-email" ||error.code.substring(5)=="missing-email" ){
      signupEmailPlaceholder.setAttribute('placeholder', "بريد الكتروني غير صحيح");
      signupEmailPlaceholder.style.borderColor = "rgb(194, 3, 3)";
    }else if(error.code.substring(5)=="internal-error"  ){
      signupPasswordPlaceholder.value = "";
      signupPasswordPlaceholder.setAttribute('placeholder', "برجاء ادخال باسورد  ");
      signupPasswordPlaceholder.style.borderColor = "rgb(194, 3, 3)";
    }else if(error=="FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
      signupPasswordPlaceholder.value = "";
      signupPasswordPlaceholder.setAttribute('placeholder', " يجب ان يتكون الباسورد من 6 خانات على الاقل");
      signupPasswordPlaceholder.style.borderColor = "rgb(194, 3, 3)";
    }else if(firstName== "" || lastName=="" || phoneNumber==""){
      firstNamePlaceholder.style.borderColor = "rgb(194, 3, 3)";
      lastNamePlaceholder.style.borderColor = "rgb(194, 3, 3)";
      phoneNumberPlaceholder.style.borderColor = "rgb(194, 3, 3)";
      firstNamePlaceholder.setAttribute('placeholder', "برجاء كتابة الاسم الاول");
      lastNamePlaceholder.setAttribute('placeholder', "برجاء كتابة الكنية");
      phoneNumberPlaceholder.setAttribute('placeholder', "برجاء كتابة رقم الموبايل");
    }
  }
// save users in firestore DB
try {
  const usersRef = collection(db, "users");
  const userDoc = doc(usersRef, email);
  await setDoc(userDoc, {
    FirstName: firstName,
    LastName: lastName,
    Phone: phoneNumber
  });
} catch (e) {
  console.error("Error adding document: ", e);
}
// to read the data in firestore DB
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

}
const monitorAuthState = async () => {
  await onAuthStateChanged(auth, user => {
    if (user.emailVerified == true) {
      console.log(user.email)
      localStorage.setItem("email",user.email);
      showApp()
    }
    else {
      showPopup()
      // alert("logged out ")
    }
  })
}
const logout = async () => {
  await signOut(auth);
  alert("logged out");
}
monitorAuthState();





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
const logoutButton = document.querySelector('.logout');
const loginEmailPlaceholder = document.querySelector('#login-email');
const loginPasswordPlaceholder = document.querySelector('#login-password');
const signupEmailPlaceholder = document.querySelector('#signup-email');
const signupPasswordPlaceholder = document.querySelector('#signup-password');
const firstNamePlaceholder = document.querySelector("#FisrtName");
const lastNamePlaceholder = document.querySelector("#LastName");
const phoneNumberPlaceholder = document.querySelector("#PhoneNum");

// const displayName = document.querySelector('.display-name');
// const displayEmail = document.querySelector('.display-email');
// const displayPhone = document.querySelector('.display-phone');
// const userCred = document.querySelector('.user-cred');

var loginTabClicked = false;
var signupTabClicked = false;

// window.addEventListener('load', showPopup);
window.addEventListener('load', showLoginTab);
loginButton.addEventListener('click', loginEmailPassword);
signupButton.addEventListener('click', createAccount);
loginTab.addEventListener('click', showLoginTab);
signupTab.addEventListener('click', showSignupTab);
anchorLogin.addEventListener('click', showLoginTab);
anchorSignup.addEventListener('click', showSignupTab);
logoutButton.addEventListener('click', logout);


