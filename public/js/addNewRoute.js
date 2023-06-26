let sendButton = document.querySelector(".submit-btn");
let locationInput = document.getElementById("validationCustom01");
let destinationInput = document.getElementById("validationCustom02");

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
    console.log(loc);
    console.log(dest);
    let locationLat = autocompleteLoc.getPlace().geometry.location.lat();
    let locationLong = autocompleteLoc.getPlace().geometry.location.lng();
    let destinationLat = autocompleteDest.getPlace().geometry.location.lat();
    let destinationLong = autocompleteDest.getPlace().geometry.location.lng();
    let Location = `${locationLat},${locationLong}`;
    let Destination = `${destinationLat},${destinationLong}`;
    console.log(`Location lat ${locationLat} | Location long ${locationLong}`);
    console.log(`Destination lat ${destinationLat} | Destination long ${destinationLong}`);
    console.log(`Location:${Location} |Destination:${Destination} |type:${type} | cost:${cost} | line name:${lineName}` );
    console.log("********************************");
    locationInput.value = `${autocompleteLoc.getPlace().geometry.location.lat()},${autocompleteLoc.getPlace().geometry.location.lng()}`;
    destinationInput.value = `${autocompleteDest.getPlace().geometry.location.lat()},${autocompleteDest.getPlace().geometry.location.lng()}`
    localStorage.setItem('DestinationLatitude', autocompleteDest.getPlace().geometry.location.lat());
    localStorage.setItem('DestinationLongitude', autocompleteDest.getPlace().geometry.location.lng());

    // add new route api
    const payload = {
        Location: Location,
        Destination: Destination,
        Cost: cost,
        LineName: lineName,
        Type: type
      };
    
      const url = "https://tawsila-api.onrender.com/addNewRoute";
    
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          // Handle response data
          console.log(data);
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    
    }
sendButton.addEventListener("click", takeInput)
// window.addEventListener("click", takeInput)




    
    
   