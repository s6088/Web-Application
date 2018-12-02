var config = {
    apiKey: "AIzaSyBS3lIsr-LKg-7_hwvMneniXImHXsJd85c",
    authDomain: "helpme-2ce8a.firebaseapp.com",
    databaseURL: "https://helpme-2ce8a.firebaseio.com",
    projectId: "helpme-2ce8a",
    storageBucket: "helpme-2ce8a.appspot.com",
    messagingSenderId: "130984454921"
};
firebase.initializeApp(config);

var uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    recaptchaParameters: {
        size: 'invisible',
    },
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = 'dashboard.html';
    }
}, function (error) {
    console.log(error);
});