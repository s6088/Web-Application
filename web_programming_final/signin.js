(function () {
    var config = {
        apiKey: "AIzaSyBS3lIsr-LKg-7_hwvMneniXImHXsJd85c",
        authDomain: "helpme-2ce8a.firebaseapp.com",
        databaseURL: "https://helpme-2ce8a.firebaseio.com",
        projectId: "helpme-2ce8a",
        storageBucket: "helpme-2ce8a.appspot.com",
        messagingSenderId: "130984454921"
    };
    firebase.initializeApp(config);


    // //get element
    // const txtEmail = document.getElementById("txtEmail");
    // const txtPassword = document.getElementById("txtEmail");
    const btnSignIn = document.getElementById("btnSignIn");



    if (btnSignIn) {
        btnSignIn.addEventListener("click", e => {
            toggleSignIn();
        });
    }


    function toggleSignIn() {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        } else {
            var email = document.getElementById('txtEmail').value;
            var password = document.getElementById('txtPassword').value;
            if (email.length < 4) {
                alert('invalid email');
                return;
            }
            if (password.length < 4) {
                alert('invalid password');
                return;
            }

            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
            // [END authwithemail]
        }

    }

    firebase.auth().onAuthStateChanged(function (user) {
        //if (firebase.auth().currentUser) {
        if (user) {
            window.location.href = 'deshboard.html';
        } else {
            // No user is signed in.
        }
    });


}());
