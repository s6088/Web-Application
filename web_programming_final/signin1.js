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


    //get element
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtEmail");
    const btnSignIn = document.getElementById("btnSignIn");



    if (btnSignIn) {
        btnSignIn.addEventListener("click", e => {
            const email = txtEmail.value;
            const password = txtPassword.value;
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));
        });
    }


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            window.location.href = 'deshboard.html';
        } else {
            // No user is signed in.
        }
    });

    function toggleSignIn() {
        if (firebase.auth().currentUser) {
            // [START signout]
            firebase.auth().signOut();
            // [END signout]
        } else {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email.length < 4) {
                alert('Please enter an email address.');
                return;
            }
            if (password.length < 4) {
                alert('Please enter a password.');
                return;
            }
            // Sign in with email and pass.
            // [START authwithemail]
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                document.getElementById('quickstart-sign-in').disabled = false;
                // [END_EXCLUDE]
            });
            // [END authwithemail]
        }
        document.getElementById('quickstart-sign-in').disabled = true;
    }



}());
