var config = {
    apiKey: "AIzaSyBS3lIsr-LKg-7_hwvMneniXImHXsJd85c",
    authDomain: "helpme-2ce8a.firebaseapp.com",
    databaseURL: "https://helpme-2ce8a.firebaseio.com",
    projectId: "helpme-2ce8a",
    storageBucket: "helpme-2ce8a.appspot.com",
    messagingSenderId: "130984454921"
};
firebase.initializeApp(config);


var map;
var myLatLng;
var postsRef;


function initMap() {

    navigator.geolocation.getCurrentPosition(function (location) {
        myLatLng = { lat: location.coords.latitude, lng: location.coords.longitude };
        pullData();
    });

}


function pullData() {


    postsRef = firebase.database().ref('posts');


    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 12
    });


    postsRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            //var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent(childData.base + '/' + childData.deadline);
            var marker = new google.maps.Marker({
                map: map,
                position: { lat: childData.lat, lng: childData.lng },
            });
            marker.addListener('click', function () {
                document.getElementById("title").innerHTML = childData.title;
                document.getElementById("details").innerHTML = childData.details;
                $('#mymodal').modal();
            });
            infowindow.open(map, marker);
        });
    });




    postsRef.on('child_added', function (data) {
        addPostElement(postElement, data.key, data.val().text, data.val().author);
    });

    postsRef.on('child_changed', function (data) {
        setPostValues(postElement, data.key, data.val().text, data.val().author);
    });

    postsRef.on('child_removed', function (data) {
        deletePost(postElement, data.key);
    });



}

