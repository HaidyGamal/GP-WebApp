import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
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
// firestore
const db = getFirestore(app);

let sendButton = document.querySelector(".sendButton");
let locationInput = document.getElementById("validationCustom01");
let destinationInput = document.getElementById("validationCustom02");
let form = document.querySelector(".needs-validation");
let autocompleteLoc;
let autocompleteDest;

// adding autocomplete for both (from , to)
document.addEventListener("DOMContentLoaded", function () {
    

     autocompleteLoc = new google.maps.places.Autocomplete(
      locationInput,
      {
        componentRestrictions: { 'country': ['EG'] },
        fields: ['place_id', 'geometry', 'name']
      }
    );

     autocompleteDest = new google.maps.places.Autocomplete(
      destinationInput,
      {
        componentRestrictions: { 'country': ['EG'] },
        fields: ['place_id', 'geometry', 'name']
      }
    );
  });

  
// use addNewRoute api when sendButton is clicked

async function takeInput() {
    var loc = document.getElementById('validationCustom01').value;
    var dest = document.getElementById('validationCustom02').value;
    let locationLat = autocompleteLoc.getPlace().geometry.location.lat();
    let locationLong = autocompleteLoc.getPlace().geometry.location.lng();
    let destinationLat = autocompleteDest.getPlace().geometry.location.lat();
    let destinationLong = autocompleteDest.getPlace().geometry.location.lng();
    let type = document.querySelector("#validationCustom04").value;
    let arabicType = "";
    let cost = document.querySelector("#cost").value;
    let lineName = document.querySelector("#transportation-related").value;
    let Location = `${locationLat},${locationLong}`;
    let Destination = `${destinationLat},${destinationLong}`;
    // console.log(`Location lat ${locationLat} | Location long ${locationLong}`);
    // console.log(`Destination lat ${destinationLat} | Destination long ${destinationLong}`);
    console.log(`Location:${Location} |Destination:${Destination} |type:${type} | cost:${cost} | line name:${lineName}` );
    console.log("********************************");
    locationInput.value = `${autocompleteLoc.getPlace().geometry.location.lat()},${autocompleteLoc.getPlace().geometry.location.lng()}`;
    destinationInput.value = `${autocompleteDest.getPlace().geometry.location.lat()},${autocompleteDest.getPlace().geometry.location.lng()}`
    localStorage.setItem('DestinationLatitude', autocompleteDest.getPlace().geometry.location.lat());
    localStorage.setItem('DestinationLongitude', autocompleteDest.getPlace().geometry.location.lng());
  
    
    // firestore
    // Retrieve the "number" value from localStorage or set it to 0
    let number = parseInt(localStorage.getItem("number")) || 0;
  
    // Define the "web" string using the current "number" value
    let web = `WEB:${number}`;
  
    try {
      let email = localStorage.getItem("email")
      const usersRef = collection(db, "Nodes");
      const userDoc = doc(usersRef, web);
      await setDoc(userDoc, {
        Cost:cost,
        Distance: "0.7",
        FromLatitude: locationLat,
        FromLongitude: locationLong,
        "Node Name": lineName,
        ToLatitude: destinationLat,
        ToLongitude:destinationLong ,
        Type: type,
        id: email
      });
  
      // Increment the "number" value and store it in localStorage
      number++;
      localStorage.setItem("number", number);
  
      // Read the saved document from Firestore and log it to the console
      const savedDoc = await getDocs(userDoc);
      console.log(`${savedDoc.id} => ${JSON.stringify(savedDoc.data())}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  
    // Read the data in Firestore and log it to the console
    const querySnapshot = await getDocs(collection(db, "Nodes"));
  
    // Count the number of occurrences of each set of field values
    const counts = {};
    querySnapshot.forEach((doc) => {
      const values = [
        doc.data().Type, 
        doc.data().Cost, 
        doc.data().FromLatitude, 
        doc.data().FromLongitude, 
        doc.data()["Node Name"], 
        doc.data().ToLatitude, 
        doc.data().ToLongitude,
      ];
      const key = values.join("|");
      counts[key] = (counts[key] || 0) + 1;
  
      if(counts[key] > 5){
        console.log(`This path already exists in database (>5): ${key}`);
        alert("This path already exists in database (>5)");
        return;
      }else if(counts[key] <= 5){

       
            
            // use API
            const [type, cost, fromLat, fromLong, nodeName, toLat, toLong] = key.split("|");
            // console.log(`Key:${nodeName} => count:${count}`);
           
            // console.log(`Field values "${key}" have ${count} duplicates.`);
            // add new route api
            const xhr = new XMLHttpRequest();
            const url = "https://tawsila-api.onrender.com/addNewRoute";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                 console.log("onreadystatechange fired"); // Add this line
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status === 200) {
                    console.log("POST request succeeded");
                    console.log(xhr.responseText);
                    if (xhr.responseText === "false") {
                      console.log("API returned false, path already exists in DB");
                      alert("This path already exists in database (API false)");
                      return;  // Stop execution if this condition is true
                    }
                  } else {
                    console.error("POST request failed.");
                  }
                }
              };
            const data = JSON.stringify({
              "Location": `${fromLat},${fromLong}`,
              "Destination": `${toLat }, ${toLong}`,
              "Cost": `${cost}`,
              "LineName": `${nodeName}`,
              "Type": `${type}`,
            });
            if (counts[key] === 5) { 
            // window.alert("Thank you, your form was sent");
            console.log(`This form was sent for 5 times, add it to database: ${key}`);
            console.log("HOLA");
            xhr.send(data);
            console.log(data);
            }
           
            // console.log(xhr);
          
      }
    });
  
    // Check if any set of field values has 5 duplicates and call API
    // Object.entries(counts).forEach(([key, count]) => {
    //   const [type, cost, fromLat, fromLong, nodeName, toLat, toLong] = key.split("|");
    //   if (count === 5) {
    //     console.log(`Key:${nodeName} => count:${count}`);
    //     console.log("HOLA");
    //     // console.log(`Field values "${key}" have ${count} duplicates.`);
    //     // add new route api
    //     const xhr = new XMLHttpRequest();
    //     const url = "https://tawsila-api.onrender.com/addNewRoute";
    //     xhr.open("POST", url, true);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //     xhr.onreadystatechange = function () {
    //       if (xhr.readyState === XMLHttpRequest.DONE) {
    //         if (xhr.status === 200) {
    //           console.log(xhr.responseText.summary.query);
    //         } else {
    //           console.error("POST request failed.");
    //         }
    //       }
    //     };
    //     const data = JSON.stringify({
    //       "Location": `${fromLat},${fromLong}`,
    //       "Destination": `${toLat }, ${toLong}`,
    //       "Cost": `${cost}`,
    //       "LineName": `${nodeName}`,
    //       "Type": `${type}`,
    //     });
    //     xhr.send(data);
    //     console.log(data);  // Log the data sent to API to the console
    //   }
    //   }); 
    }



// window.addEventListener("dblclick", firestore);
form.addEventListener("submit",function(event){
        event.preventDefault();
        takeInput();
        window.alert("Thank you, your form was sent");
        // setTimeout(()=>{location.reload();},5000);
        // form.reset();
    })

       














/*
to return the created relationship:
--------------------------------
MATCH (n1:LOCATION)-[r:LINE {name: 'ههههه'}]->(n2:LOCATION)
RETURN n1,r,n2

to delete the created relationship:
-----------------------------------
MATCH (:LOCATION)-[r:LINE {name: 'ههههه'}]->(:LOCATION)
DELETE r
*/
