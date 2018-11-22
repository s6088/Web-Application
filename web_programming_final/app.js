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
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogOut = document.getElementById("btnLogOut");

  if (btnSignUp) {
    btnSignUp.addEventListener("click", e => {
      const email = txtEmail.value;
      const password = txtPassword.value;
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
      window.location.href = 'deshboard.html';
    });
  }


  if (btnSignIn) {
    btnSignIn.addEventListener("click", e => {
      const email = txtEmail.value;
      const password = txtPassword.value;
      const auth = firebase.auth();

      //sign in
      const promise = auth.signInWithEmailAndPassword(email, password);

      promise.catch(e => console.log(e.message));
    });
  }

  if (btnLogOut) {
    btnLogOut.addEventListener("click", e => {
      firebase.auth().signOut();
      window.location.href = 'index.html';
    });
  }



}());
