let autocompleteLoc ;
let autocompleteDest ;
function initialize(){
    autocompleteLoc = new google.maps.places.Autocomplete(
        document.getElementById("myInput"),
        {
            types: ['establishment'],
            componentRestrictions:{'country':['EG']},
            fields: ['place_id', 'geometry', 'name']
        }
    );
    autocompleteDest = new google.maps.places.Autocomplete(
        document.getElementById("myInput1"),
        {
            types: ['establishment'],
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
    
}

window.addEventListener("click", takeInput);
window.addEventListener("load", initialize);