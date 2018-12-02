// Initialize Firebase
var config = {
  apiKey: "AIzaSyBS3lIsr-LKg-7_hwvMneniXImHXsJd85c",
  authDomain: "helpme-2ce8a.firebaseapp.com",
  databaseURL: "https://helpme-2ce8a.firebaseio.com",
  projectId: "helpme-2ce8a",
  storageBucket: "helpme-2ce8a.appspot.com",
  messagingSenderId: "130984454921"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref("posts");
var myLatLng;
var marker;
const btnPost = document.getElementById("btnPost");

navigator.geolocation.getCurrentPosition(function (location) {
  myLatLng = { lat: location.coords.latitude, lng: location.coords.longitude };
  initMap();
});


btnPost.addEventListener("click", e => {
  writeNewPost("1");
});



function writeNewPost(uid) {

  var title = document.getElementById("title").value;
  var details = document.getElementById("details").value;
  var location = document.getElementById("pac-input").value;
  var base = document.getElementById("base").value;
  var deadline = document.getElementById("deadline").value;

  if (!title | !details | !location | !base | !deadline | !uid) {
    alert("invalid information");
    return;
  }
  var postData = saveMessage(title, details, location, base, deadline, uid);

  // Get a key for a new Post.

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var newPostKey = firebase.database().ref().child('posts').push().key;
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  firebase.database().ref().child('users').child(uid).child('posted').push(newPostKey);
  return firebase.database().ref().update(updates);
}









function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 15
  });
  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);


  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    position: myLatLng,
    anchorPoint: new google.maps.Point(0, -29)
  });

  marker.addListener('drag', function (event) {
    myLatLng.lat = this.getPosition().lat();
    myLatLng.lng = this.getPosition().lng();
  });


  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    myLatLng = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };

    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

  });



}


google.maps.event.addDomListener(window, "load", initMap);

function saveMessage(title, details, location, base, deadline, uid) {
  return {
    title: title,
    details: details,
    deadline: deadline,
    location: location,
    base: base,
    status: 0,
    lat: myLatLng.lat,
    lng: myLatLng.lng,
    uid: uid
  };
}