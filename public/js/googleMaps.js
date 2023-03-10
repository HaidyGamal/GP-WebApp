let autocompleteLoc ;
let autocompleteDest ;

const currentLocButton = document.querySelector("#current-location");
const locationInputField = document.querySelector("#myInput");
const destinationInputField = document.querySelector("#myInput1");
const submitButton = document.querySelector(".result-btn");
currentLocButton.addEventListener('click', getCurrentLocation)

function initialize(){
    autocompleteLoc = new google.maps.places.Autocomplete(
        document.getElementById("myInput"),
        {
            // types: ['geocode'],
            componentRestrictions:{'country':['EG']},
            fields: ['place_id', 'geometry', 'name']
        }
    );
    autocompleteDest = new google.maps.places.Autocomplete(
        document.getElementById("myInput1"),
        {
            // types: ['geocode'],
            componentRestrictions:{'country':['EG']},
            fields: ['place_id', 'geometry', 'name']
        }
    );
}

function takeInput(){
    var loc = document.getElementById('myInput').value;
    var dest = document.getElementById('myInput1').value;
    console.log(loc);
    console.log(dest);
    console.log(`Location lat ${autocompleteLoc.getPlace().geometry.location.lat()} | Location long ${autocompleteLoc.getPlace().geometry.location.lng()}`);
    console.log(`Destination lat ${autocompleteDest.getPlace().geometry.location.lat()} | Destination long ${autocompleteDest.getPlace().geometry.location.lng()}`);
    locationInputField.value = `${autocompleteLoc.getPlace().geometry.location.lat()},${autocompleteLoc.getPlace().geometry.location.lng()}`;
    destinationInputField.value = `${autocompleteDest.getPlace().geometry.location.lat()},${autocompleteDest.getPlace().geometry.location.lng()}`
    
}

function getCurrentLocation(){
    if(navigator.geolocation){
        console.log("geo supported")
        navigator.geolocation.getCurrentPosition(
        function(position){
            // console.log(position.coords)
             let latitiude = position.coords.latitude
             let longitude = position.coords.longitude
            console.log(`latitiude: ${latitiude}`)
            console.log(`longitude: ${longitude}`)
    
            // convert lat , long to address
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitiude},${longitude}&key=AIzaSyAqDsDp7F3rMVqVaJgr6ciN_RAN0E5V6Yw`, {
                    headers: {
                        'Accept': 'application/json'
                    }
            })
       .then(function(response){
        return response.json()
       })
       .then(function (json){
        let address = json.results[3].formatted_address
        locationInputField.value = address
        console.log(address)
       })
        },
        function(error){
            console.log(error)
        })
    }else{
        console.log("geo not supported")
    }
}

function initMap() {
    // The location of Uluru
    const uluru = { lat: 29.9778969, lng: 30.9345641 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom:19,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

    // Get user's location
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`);

        // Set marker's position.
        marker.setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        // Center map to user's position.
        map.panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      err => alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`)
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
  }
submitButton.addEventListener("click", takeInput);
window.addEventListener("load", initialize);
window.addEventListener("load", initMap);
// window.addEventListener("load", autocomplete);