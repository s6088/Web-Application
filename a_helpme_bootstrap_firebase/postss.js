var config;
var map;
var myLatLng;
var postsRef;

/** Initializes the map and the custom popup. */
function initMap() {

    navigator.geolocation.getCurrentPosition(function (location) {
        myLatLng = { lat: location.coords.latitude, lng: location.coords.longitude };

        pullData();
    });

}


function pullData() {

    config = {
        apiKey: "AIzaSyBS3lIsr-LKg-7_hwvMneniXImHXsJd85c",
        authDomain: "helpme-2ce8a.firebaseapp.com",
        databaseURL: "https://helpme-2ce8a.firebaseio.com",
        projectId: "helpme-2ce8a",
        storageBucket: "helpme-2ce8a.appspot.com",
        messagingSenderId: "130984454921"
    };
    firebase.initializeApp(config);


    postsRef = firebase.database().ref('posts');


    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 2,
    });


    postsRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            var marker = new google.maps.Marker({
                map: map,
                position: { lat: childData.lat, lng: childData.lng },
                label: childData.base + '/' + childData.hours
            });
            marker.addListener('click', function () {
                document.getElementById("title").innerHTML = childData.title;
                document.getElementById("details").innerHTML = childData.details;
                $('#mymodal').modal();
            });
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

function myWindow(post) {
    return '<div class="card">' +
        '<div class="card-header">Post Details</div>' +
        '<div class="card-body">' +
        ' <h5 class="card-title">' + post.title + '</h5>' +
        '<p class="card-text">' + post.details + '</p>' +
        '<a href="#" class="btn btn-primary">Go somewhere</a>' +
        '</div>' +
        '</div>';
}

function myModal(post) {
    return '<div class="modal fade" id="myModal" role="dialog">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '<h4 class="modal-title">Modal Header</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p>Some text in the modal.</p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '</div>' +
        '</div>' +
        ' </div>' +
        '</div>';
}