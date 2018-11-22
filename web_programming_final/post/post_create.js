// Initialize Firebase
var config = {
  apiKey: "AIzaSyDjl6xfOIP-aFO9h9qWTbosHcPXKcuCroU",
  authDomain: "solar-botany-223201.firebaseapp.com",
  databaseURL: "https://solar-botany-223201.firebaseio.com",
  projectId: "solar-botany-223201",
  storageBucket: "",
  messagingSenderId: "1020712681719"
};
firebase.initializeApp(config);

//form sync
// Target the form elements by their ids
// And build the form object like this using jQuery:

var formData = {
  title: $("#title").val(),
  description: $("#description").val()
};

// Then listen to the form submit event
$("#myForm").submit(function(evt) {
  console.log("mycar.brand");
  evt.preventDefault(); //Prevent the default form submit action
  // You have formData here and can do this:
  firebase.initializeApp(config); //Initialize your firebase here passing your firebase account config object
  firebase
    .database()
    .ref("/post")
    .push(formData); // Adds the new form data to the list under formDataTree node
});




//place and map api

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -7.0157404,
      lng: 110.4171283
    },
    zoom: 12
  });
  var input = /** @type {!HTMLInputElement} */ (document.getElementById(
    "pac-input"
  ));

  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
    draggable: true
  });
  google.maps.event.addListener(marker, "dragend", function() {
    document.getElementsByName(
      "latitude"
    )[0].value = marker.getPosition().lat();
    document.getElementsByName(
      "longitude"
    )[0].value = marker.getPosition().lng();
  });

  autocomplete.addListener("place_changed", function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setIcon(
      /** @type {google.maps.Icon} */ ({
        url: "http://maps.google.com/mapfiles/ms/icons/red.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      })
    );
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          ""
      ].join(" ");
    }

    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();

    $("input[name=coordinate]").val(address);
    $("input[name=latitude]").val(latitude);
    $("input[name=longitude]").val(longitude);

    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    );
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener("click", function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener("changetype-all", []);
  setupClickListener("changetype-address", ["address"]);
  setupClickListener("changetype-establishment", ["establishment"]);
  setupClickListener("changetype-geocode", ["geocode"]);
}
google.maps.event.addDomListener(window, "load", initMap);
