(function () {
   var config = {
    apiKey: "AIzaSyAp9P7HZ8dfgUiZYir7Ru3sDSLwBfLjscg",
    authDomain: "dc-3d6b.firebaseapp.com",
    databaseURL: "https://dc-3d6b.firebaseio.com",
    projectId: "dc-3d6b",
    storageBucket: "dc-3d6b.appspot.com",
    messagingSenderId: "202620899397"
  };
  firebase.initializeApp(config);


    const btnLogOut = document.getElementById("btnLogOut");



    if (btnLogOut) {

        btnLogOut.addEventListener("click", e => {
            firebase.auth().signOut();
        });
    }


    firebase.auth().onAuthStateChanged(function (user) {
        //if (firebase.auth().currentUser) {
        if (!user) {
            window.location.href = 'file:///C:/Users/User/Desktop/web/web.html';
        }
    });


}());
