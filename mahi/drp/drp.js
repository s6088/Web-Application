(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCIaQMcbB88Fy9DNOF7n1rhDP8GDhGBDKY",
        authDomain: "mahi-8f511.firebaseapp.com",
        databaseURL: "https://mahi-8f511.firebaseio.com",
        projectId: "mahi-8f511",
        storageBucket: "mahi-8f511.appspot.com",
        messagingSenderId: "11523218184"
    };
    firebase.initializeApp(config);

    var userDataRef = firebase.database().ref("doctors").orderByKey();
    userDataRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();

                var html = '<div class="row">' +
                    '<div class="col-md-2" style="padding-top: 15px;">' +
                    '<img class="img-circle search_page_doctor_image pull-right" src="unknown.png" alt="profile pic">' +
                    '</div>' +
                    '<div class="col-md-4" style="padding-left: 50px;">' +
                    '<p class="des"> Name : ' + childData.name + '</p>' +
                    '<p class="des"> Degree : ' + childData.degree + '</p>' +
                    '<p class="des"> Hospital : ' + childData.hname + '</p>' +
                    '</div>' +
                    '<div class="col-md-4">' +
                    '<i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp &nbsp' +
                    '<p> Location : ' + childData.location + '</p>' +
                    '<i class="fa fa-money" aria-hidden="true"></i> &nbsp &nbsp fees : ' + childData.hfee +
                    '</div>' +
                    '<div class="col-md-2" style="padding-top:  30px;">' +
                    '<a target="_blank" href="#" class="btn btn-success btn-sm hidden-xs"><i class="fa fa-user-md" aria-hidden="true"></i> View Profile</a>' +
                    '</div>' +
                    '</div>' +
                    '<hr>';
                $("#mydiv").append(html);
            });
        });
}());