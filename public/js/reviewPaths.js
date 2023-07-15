import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { addDoc, collection, getDocs, getFirestore, doc, setDoc, updateDoc , increment } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyAb7HACiJd16gpmh-4uZz0m1bd6qmNRbjE",
    authDomain: "public-transportation-gu-bdeed.firebaseapp.com",
    projectId: "public-transportation-gu-bdeed",
    storageBucket: "public-transportation-gu-bdeed.appspot.com",
    messagingSenderId: "704436761029",
    appId: "1:704436761029:web:1a09532a254ea028a15bac",
    measurementId: "G-5HVLYKW6QB",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const likeButton = document.querySelector(".fa-thumbs-up");
const iconDislikesSpan = document.querySelector(".dislike-count");
const iconLikesSpan = document.querySelector(".like-count");
const options = document.querySelectorAll('input[name="options"]');
const submitReviewButton = document.querySelector(".submit-review");


const setLikesCounterForURL = (url, value) => {
    localStorage.setItem(`likesCounter_${url}`, value);
  };
const setBadPathCounterForURL = (url, value, id)=>{
    localStorage.setItem(`badPathCounter_${url}_${id}`,value);
}
const setPathNotFoundCounterForURL = (url, value,id)=>{
    localStorage.setItem(`pathNotFoundCounter_${url}_${id}`,value);
}
const setIconLikesCountForURL= (url, value)=>{
    localStorage.setItem(`iconLikesCount_${url}`,value);
}
const setIconDislikesCountForURL= (url, value, id)=>{
    localStorage.setItem(`iconDislikesCount_${url}_${id}`,value);
}
  
  const getLikesCounterForURL = (url) => {
    return localStorage.getItem(`likesCounter_${url}`) || 0;
  };
  const getBadPathCounterForURL = (url,id)=>{
    return localStorage.getItem(`badPathCounter_${url}_${id}`) || 0;
  };
  const getPathNotFoundCounterForURL = (url,id)=>{
    return localStorage.getItem(`pathNotFoundCounter_${url}_${id}`) || 0;
  }
  const getIconLikesCountForURL= (url)=>{
    return localStorage.getItem(`iconLikesCount_${url}`) || 0;
  }
  const getIconDislikesCountForURL= (url,id)=>{
    return localStorage.getItem(`iconDislikesCount_${url}_${id}`) || 0;
  }
  
  const incrementLikesCounterForURL = (url) => {
    let likesCounter = getLikesCounterForURL(url);
    likesCounter = Number(likesCounter) + 1;
    localStorage.setItem(`likesCounter_${url}`, likesCounter);
  };
  const incrementBadPathCounterForURL = (url, id) =>{
    let badPathCounter = getBadPathCounterForURL(url, id);
    badPathCounter = Number(badPathCounter)+1;
    localStorage.setItem(`badPathCounter_${url}_${id}`, badPathCounter);
  };
  const incrementPathNotFoundCounterForURL = (url,id) =>{
    let pathNotFoundCounter = getPathNotFoundCounterForURL(url,id);
    pathNotFoundCounter = Number(pathNotFoundCounter)+1;
    localStorage.setItem(`pathNotFoundCounter_${url}_${id}`, pathNotFoundCounter);
  };
  const incrementIconLikesCountForURL= (url) =>{
    let iconLikesCount = getIconLikesCountForURL(url);
    iconLikesCount = Number(iconLikesCount)+1;
    localStorage.setItem(`likesCounter_${url}`, iconLikesCount);
  };
  const incrementIconDislikesCountForURL= (url) =>{
    let iconDislikesCount = getIconDislikesCountForURL(url);
    iconDislikesCount = Number(iconDislikesCount)+1;
    localStorage.setItem(`iconDislikesCount_${url}`, iconDislikesCount);
  };
  
 
  options.forEach(function(option) {
    option.addEventListener('change', function() {
      const additionalOptionsContainer = document.getElementById(`additionalOptions-${option.id}`);
      
      if (option.checked) {
        additionalOptionsContainer.innerHTML = '';
        
        // Create additional radio buttons
        const radio1 = createRadioButton(`additional-${option.id}`, `radio1-${option.id}`, 'الطريق غير موجود');
        const radio2 = createRadioButton(`additional-${option.id}`, `radio2-${option.id}`, 'الطريق سئ');
        // const radio3 = createRadioButton(`additional-${option.id}`, `radio3-${option.id}`, 'Additional 3');
        
        // Append additional radio buttons to the container
        additionalOptionsContainer.appendChild(radio1);
        additionalOptionsContainer.appendChild(radio2);
        // additionalOptionsContainer.appendChild(radio3);
      } else {
        additionalOptionsContainer.innerHTML = '';
      }
    });
    
    // Get the associated label elements
    const labels = document.querySelectorAll(`label[for="${option.id}"]`);
    
    // Add event listeners to the labels for toggling the checkbox
    labels.forEach(function(label) {
      label.addEventListener('click', function() {
        if (option.disabled) {
          return; // Ignore the click event if the checkbox is disabled
        }
        
        option.checked = !option.checked;
        
        const changeEvent = new Event('change');
        option.dispatchEvent(changeEvent);
      });
    });
  });
  
  function createRadioButton(name, id, label) {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.id = id;
  
    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = id;
    radioLabel.textContent = label;
  
    const radioButtonDiv = document.createElement('div');
    radioButtonDiv.appendChild(radio);
    radioButtonDiv.appendChild(radioLabel);
  
    return radioButtonDiv;
  }
  

//1] identify where are you on page load (from URL get ids "pathIdentifier array")
const pathIdentifier = [];
window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const names = urlParams.get('names');
    const lineNumbers = urlParams.get('lineNumbers');
    const types = urlParams.get('types');
  
    // Check if any of the required query parameters are missing
    if (!names || !lineNumbers || !types) {
      console.error('One or more required query parameters are missing');
      return;
    }
  
    // Split the names, lineNumbers, and types by comma to get individual values
    const namesArr = names.split(',')
      .map((name) => decodeURIComponent(name.trim()));
    const lineNumbersArr = lineNumbers.split(',')
      .map((lineNumber) => decodeURIComponent(lineNumber.trim()));
    const typesArr = types.split(',')
      .map((type) => decodeURIComponent(type.trim()));
  
    for (let i = 0; i < namesArr.length; i++) {
      const name = namesArr[i];
      const nextName = namesArr[i + 1];
      let lineNumber = lineNumbersArr[i];
      let type = typesArr[i];
  
      // Check if any required value is undefined
      if (!name || !lineNumber || !type) {
        console.error('One or more values in names, lineNumbers, or types are undefined');
        continue; // Skip iteration if any value is undefined
      }
  
      lineNumber = lineNumber.replace("/", "");
      // Replace type with the desired translation
      if (type === 'bus') {
        type = 'أوتوبيس رقم';
      } else if (type === 'microbus') {
        type = 'ميكروباص';
      } else if (type === 'metro') {
        type = 'مترو';
      }
  
      // Append the modified string to pathIdentifier array
      pathIdentifier.push(`${name}|${nextName}|${type} ${lineNumber}`);
    }
  
    console.log('pathIdentifier:', pathIdentifier);
  });


//2] search in fire store for any document id that mathes one or all of your pathIdentifier array
const documentIds = [];
const collectReviewDocumentIds = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Reviews"));
  
      
  
      querySnapshot.forEach((doc) => {
        documentIds.push(doc.id);
      });
  
      console.log('Review Document IDs:', documentIds);
    } catch (error) {
      console.error('Error fetching Firestore documents:', error);
    }
  };
  collectReviewDocumentIds();



const matchingId = pathIdentifier.find((id) => documentIds.includes(id));
if (matchingId) {
    //3] if you found one, take it as your id that will be used to target firestore
  console.log('Matching Document ID:', matchingId);
} else {
  console.log('No matching Document ID found');
  //4]  if the user clicked likeButton,create new document id with each one of pathIdentifier array, and increase "Likes" by 1 for each one of the pathIdentifier array
  // Set the value of likesCounter in localStorage
}
  
const addReviewDocument = async (id) => {
    try {
      const usersRef = collection(db, "Reviews");
      const userDoc = doc(usersRef, id);
  
      const currentURL = window.location.href;
      const likesCounter = getLikesCounterForURL(currentURL);
      const badPathCounter = getBadPathCounterForURL(currentURL, id);
      const pathNotFoundCounter = getPathNotFoundCounterForURL(currentURL, id);

      await setDoc(userDoc, {
        BadPathDislikes: Number(badPathCounter),
        Likes: Number(likesCounter),
        UnFoundPathDislikes: Number(pathNotFoundCounter)
      });

      console.log(`Document added for ${id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  const processPathIdentifiers = async () => {
    incrementLikesCounterForURL(window.location.href);
    for (let i = 0; i < pathIdentifier.length; i++) {
      const id = pathIdentifier[i];
      console.log(id)
      await addReviewDocument(id);
    }
    
  };
  

  likeButton.addEventListener("click", async()=>{
    processPathIdentifiers();
   

    let likes = []
    let dislikes = []
    let dislikesSum=0
    const querySnapshot = await getDocs(collection(db, "Reviews"));
        querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().Likes}`);
    likes.push(doc.data().Likes)
    dislikes.push({BadPathDislikes:doc.data().BadPathDislikes, UnFoundPathDislikes:doc.data().UnFoundPathDislikes, id:doc.id})
    });
for(let i = 0 ; i< dislikes.length ; i++){
 dislikesSum+= Number(dislikes[i].BadPathDislikes)+Number(dislikes[i].UnFoundPathDislikes);
}
console.log(likes[0]);
// console.log(dislikesSum);
const currentURL = window.location.href;
setIconLikesCountForURL(currentURL,Number(likes[0]));
setIconDislikesCountForURL(currentURL,Number(dislikesSum), dislikes.id);
const iconLikesCount = getIconLikesCountForURL(currentURL);
const iconDislikesCount = getIconDislikesCountForURL(currentURL);

iconLikesSpan.textContent = Number(iconLikesCount);
iconDislikesSpan.textContent = Number(iconDislikesCount);
  });

// if the user clicked dislike, capture the data he will choose and save them in an array named dislikedTargets
// you will target each id in the dislikedTargets, and you will decide wether to increase the bad route dislikes or the not found route dislikes according to the additional info you get from the sub option


let selectedOptions = [];
let optionWithoutSubOption=[];
const whichOptionIsClicked = async () => {
    for (let i = 0; i < selectedOptions.length; i++) {
        if (selectedOptions[i].includes("#الطريق سئ")) {
        //   console.log("الطريق سئ");
        //   console.log(selectedOptions[i].split("#")[0]);
          const id = selectedOptions[i].split(" #")[0];
          incrementBadPathCounterForURL(window.location.href, id);
          await addReviewDocument(id);
        } else if (selectedOptions[i].includes("#الطريق غير موجود")) {
        //   console.log("الطريق غير موجود");
        //   console.log(selectedOptions[i].split("#")[0]);
          const id = selectedOptions[i].split(" #")[0];
          incrementPathNotFoundCounterForURL(window.location.href, id);
          await addReviewDocument(id);
        }
      }
  };
  
submitReviewButton.addEventListener("click" , async()=>{
        let checkboxSelected = false;
    let subOptionSelected = false;
  
    options.forEach(function(option) {
      if (option.checked) {
        checkboxSelected = true;
        const additionalOptionsContainer = document.getElementById(`additionalOptions-${option.id}`);
        const subOptions = additionalOptionsContainer.querySelectorAll('input[type="radio"]');
        
        subOptions.forEach(function(subOption) {
          if (subOption.checked) {
            subOptionSelected = true;
            return;
          }
        });
      }
    });
  
    if (!checkboxSelected || !subOptionSelected) {
      const labels = document.querySelectorAll('label');
      labels.forEach(function(label) {
        label.style.color = "rgb(190, 3, 3)";
      });
    } else {
      const labels = document.querySelectorAll('label');
      labels.forEach(function(label) {
        label.style.color = "";
      });
      submitReviewButton.setAttribute("data-dismiss", "modal");
    //   submitReviewButton.click();
    }
    const subOptionName = null;
   
    const checkboxes = document.querySelectorAll('input[name="options"]:checked');
    selectedOptions = Array.from(checkboxes).map((checkbox) => {
      const label = checkbox.nextElementSibling;
      let line = checkbox.value;
      const name = getName(label);
      const nextName = label.querySelector(".node-name:nth-child(2)").textContent.trim();
      let type = getType(label.textContent.trim());
    
      line = line.replace("/", "");
    
      const subOptionContainer = document.getElementById(`additionalOptions-${checkbox.id}`);
      const subOption = subOptionContainer.querySelector('input[type="radio"]:checked');
    
      const subOptionName = subOption ? subOption.labels[0].textContent.trim() : '';
    
      return `${name}|${nextName}|${type} ${line} #${subOptionName}`;
    });
    
    // console.log(selectedOptions);
    for (let i = 0; i < selectedOptions.length; i++) {
    //   console.log(selectedOptions[i]);
       optionWithoutSubOption = selectedOptions[i].split(" #")[0];
    //   console.log(optionWithoutSubOption);
    }
    whichOptionIsClicked();



    let likes = []
    let dislikes = []
    let dislikesSum=0
    const querySnapshot = await getDocs(collection(db, "Reviews"));
        querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().Likes}`);
    likes.push(doc.data().Likes)
    dislikes.push({BadPathDislikes:doc.data().BadPathDislikes, UnFoundPathDislikes:doc.data().UnFoundPathDislikes, id:doc.id})
    });
for(let i = 0 ; i< dislikes.length ; i++){
 dislikesSum+= Number(dislikes[i].BadPathDislikes)+Number(dislikes[i].UnFoundPathDislikes);
}
// console.log(likes[0]);
// console.log(dislikesSum);
const currentURL = window.location.href;

setIconLikesCountForURL(currentURL,Number(likes[0]));
setIconDislikesCountForURL(currentURL,Number(dislikesSum), dislikes.id);
const iconLikesCount = getIconLikesCountForURL(currentURL);
const iconDislikesCount = getIconDislikesCountForURL(currentURL);

iconLikesSpan.textContent = Number(iconLikesCount);
iconDislikesSpan.textContent = Number(iconDislikesCount);
    
})

function getName(label) {
    const nameElement = label.querySelector(".node-name:first-child");
    return nameElement.textContent.trim().replace(" -", "");
  }
  function getType(labelText) {
    if (labelText.includes("اوتوبيس")) {
      return "أوتوبيس رقم";
    } else if (labelText.includes("ميكروباص")) {
      return "ميكروباص";
    } else if (labelText.includes("مترو")) {
      return "مترو";
    } else {
      return "";
    }
  }



// on page load, search in pathIdentifiers[], take any Likes from any field and update the icon
window.addEventListener("load", async()=>{
    let likes = []
    let dislikes = []
    let dislikesSum=0
    const querySnapshot = await getDocs(collection(db, "Reviews"));
        querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().Likes}`);
    likes.push(doc.data().Likes)
    dislikes.push({BadPathDislikes:doc.data().BadPathDislikes, UnFoundPathDislikes:doc.data().UnFoundPathDislikes, id:doc.id})
    });
for(let i = 0 ; i< dislikes.length ; i++){
 dislikesSum+= Number(dislikes[i].BadPathDislikes)+Number(dislikes[i].UnFoundPathDislikes);
}
console.log(likes[0]);
console.log(`Dislikes sum: ${dislikesSum}`);
console.log(dislikes);
const currentURL = window.location.href;

if(iconLikesSpan.textContent = "NaN"){
    iconLikesSpan.textContent = 0
}
else{
    setIconLikesCountForURL(currentURL,Number(likes[0]));
}


setIconDislikesCountForURL(currentURL,Number(dislikesSum), dislikes.id);
const iconLikesCount = getIconLikesCountForURL(currentURL);
const iconDislikesCount = getIconDislikesCountForURL(currentURL);

iconLikesSpan.textContent = Number(iconLikesCount);
iconDislikesSpan.textContent = Number(iconDislikesCount);

});



// setBadPathCounterForURL(window.location.href, 0);
// setIconDislikesCountForURL(window.location.href, 0)
// setIconLikesCountForURL(window.location.href, 0)
// setLikesCounterForURL(window.location.href, 0)
// setPathNotFoundCounterForURL(window.location.href, 0)
localStorage.clear()
