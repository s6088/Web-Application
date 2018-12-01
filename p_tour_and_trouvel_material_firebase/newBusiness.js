// Initialize Firebase
var config = {
  apiKey: "AIzaSyBsYydE2iBd1aZsPrNR0X0MRVWJ3KHYGNU",
  authDomain: "circle-demo-b4da6.firebaseapp.com",
  databaseURL: "https://circle-demo-b4da6.firebaseio.com",
  projectId: "circle-demo-b4da6",
  storageBucket: "circle-demo-b4da6.appspot.com",
  messagingSenderId: "1000551652717"
};

firebase.initializeApp(config);

//referece masseges collection
var database = firebase.database();
var ref = database.ref("services/restaurants");

document.getElementById("myform").addEventListener("submit", submitForm);

function submitForm(e) {
  var resname = document.getElementById("resturant_name").value;
  var managername = document.getElementById("manager_name").value;
  var loc = document.getElementById("location").value;
  var price = document.getElementById("minimum_prize").value;
  var fditems = document.getElementById("food_items").value;
  var phone = document.getElementById("contact_no").value;

  ref.push(saveMessage(resname, managername, loc, price, fditems, phone));

  alert("Congratulation Your Restaurant is Live Now");
  ref.on("value", gotData, errData);
}

function gotData(data) {
  var restaurants = data.val();
  var keys = Object.keys(restaurants);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var lon = restaurants[k].lon;
    var lat = restaurants[k].lat;
  }
}

function errData() {
  alert("network error");
}

function getData() { }

function saveMessage(resname, managername, loc, price, fditems, phone) {
  return {
    name: resname,
    managerName: managername,
    mobile: phone,
    location: loc,
    price: price,
    foodItems: fditems
  };
}