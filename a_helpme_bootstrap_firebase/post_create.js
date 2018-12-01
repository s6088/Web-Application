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

//referece masseges collection
var database = firebase.database();
var ref = database.ref("posts");
var myId;
var sad;
var man;
var xx = 0, yy = 0;
var map;
var marker;

const btnPost = document.getElementById("btnPost");

navigator.geolocation.getCurrentPosition(function (location) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: location.coords.latitude, lng: location.coords.longitude },
    zoom: 13
  });

  marker = new google.maps.Marker({
    map: map,
    position: { lat: location.coords.latitude, lng: location.coords.longitude },
    draggable: true,
    anchorPoint: new google.maps.Point(0, -29)
  });
  marker.addListener('drag', handleEvent);
  marker.addListener('dragend', handleEvent);
  initMap();
});

function handleEvent(event) {
  xx = event.latLng.lat();
  yy = event.latLng.lng();
}

btnPost.addEventListener("click", e => {

  writeNewPost(myId);
});



function writeNewPost(uid) {
  var jobTitle = document.getElementById("jobTitle").value;
  var jobDescription = document.getElementById("jobDescription").value;
  var location = document.getElementById("pac-input").value;
  var address = document.getElementById("address").value;
  var initalBudget = document.getElementById("initialBudget").value;
  var deadline = document.getElementById("deadline").value;
  // A post entry.
  var postData = saveMessage(jobTitle, jobDescription, location, address, initalBudget, deadline);

  // Get a key for a new Post.

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var newPostKey = uid;
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}


function errData() {
  alert("network error");
}

function getData() { }

function saveMessage(jobTitle, jobDescription, location, address, initalBudget, deadline) {

  return {
    jobTitle: jobTitle,
    jobDescription: jobDescription,
    deadline: deadline,
    location: location,
    address: address,
    initalBudget: initalBudget,
    status: 0,
    longitude: yy,
    latitude: xx
  };
}


firebase.auth().onAuthStateChanged(function (user) {
  myId = user.uid;
  if (!user) {
    window.location.href = 'index.html';
  }
});


function initMap() {

  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);


  autocomplete.addListener('place_changed', function () {

    //infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    xx = place.geometry.location.lat;
    yy = place.geometry.location.lng;
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });



}
google.maps.event.addDomListener(window, "load", initMap);
