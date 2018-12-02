var config = {
    apiKey: "AIzaSyBS3lIsr-LKg-7_hwvMneniXImHXsJd85c",
    authDomain: "helpme-2ce8a.firebaseapp.com",
    databaseURL: "https://helpme-2ce8a.firebaseio.com",
    projectId: "helpme-2ce8a",
    storageBucket: "helpme-2ce8a.appspot.com",
    messagingSenderId: "130984454921"
};
firebase.initializeApp(config);



firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = 'index.html';
    }
}, function (error) {
    console.log(error);
});