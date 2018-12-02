// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var myLatLng;


function initialize() {

    navigator.geolocation.getCurrentPosition(function (location) {
        myLatLng = { lat: location.coords.latitude, lng: location.coords.longitude };
        pullData();
    });

}


function pullData() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: myLatLng
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng, map);
    });

    // Add a marker at the center of the map.
    addMarker(myLatLng, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: "me",
        map: map
    });
}

google.maps.event.addDomListener(window, 'load', initialize);