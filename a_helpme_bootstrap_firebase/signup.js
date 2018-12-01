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



    const btnSignUp = document.getElementById("btnSignUp");


    if (btnSignUp) {
        btnSignUp.addEventListener("click", e => {
            handleSignUp();
        });
    }


    function handleSignUp() {

        var email = document.getElementById('txtEmail').value;
        var password = document.getElementById('txtPassword').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            alert(error);
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END createwithemail]
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = 'deshboard.html';
        }
    });


}());
