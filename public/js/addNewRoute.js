let sendButton = document.querySelector(".sendButton");
// let sendButton = document.getElementById("sendButton");
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
function takeInput() {
    var loc = document.getElementById('validationCustom01').value;
    var dest = document.getElementById('validationCustom02').value;
    let type = document.querySelector("#validationCustom04").value;
    let cost = document.querySelector("#cost").value;
    let lineName = document.querySelector("#transportation-related").value;
    // console.log(loc);
    // console.log(dest);
    let locationLat = autocompleteLoc.getPlace().geometry.location.lat();
    let locationLong = autocompleteLoc.getPlace().geometry.location.lng();
    let destinationLat = autocompleteDest.getPlace().geometry.location.lat();
    let destinationLong = autocompleteDest.getPlace().geometry.location.lng();
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

    // add new route api
    const xhr = new XMLHttpRequest();
    const url = "https://tawsila-api.onrender.com/addNewRoute";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.error("POST request failed.");
        }
      }
    };
    
    const data = JSON.stringify({
      "Location": `${Location}`,
      "Destination": `${Destination}`,
      "Cost": `${cost}`,
      "LineName": `${lineName}`,
      "Type": `${type}`,
    });
    
    xhr.send(data);
    }
    form.addEventListener("submit",function(event){
        event.preventDefault();
        takeInput();
        window.alert("Thank you, your form was sent");
        setTimeout(()=>{location.reload();},2000);
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