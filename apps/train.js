var config = {
  apiKey: "AIzaSyCI952Wnf0JJiQnta93Qqf52bhZ6euoOjw",
  authDomain: "trainscheduler-21700.firebaseapp.com",
   databaseURL: "https://trainscheduler-21700.firebaseio.com",
  projectId: "trainscheduler-21700",
  storageBucket: "trainscheduler-21700.appspot.com",
  messagingSenderId: "608648764316"
};
firebase.initializeApp(config);

var nameText = $("#nametext");	
var destinationText = $("#destinationtext");
var	firsttrainText = $("#firsttext");
var frequencyText = $("#frequencytext");
var submitBtn = $("#submitBtn");


function submitClick(){
event.preventDefault();

var firebase = database.ref()

var namevalue = nameText.val().trim();
var destinationvalue = destinationText.val().trim();
var firsttrainvalue = firsttrainText.val().trim();
var frequencyvalue = frequencyText.val().trim();

var newTrain = {
  name: namevalue,
  destination: destinationvalue,
  firsttrain: firsttrainvalue,
  frequency: frequencyvalue,
};

firebase.push(newTrain);
      
}

var database = firebase.database();
database.ref().on("child_added", function(snapshot) {
// Log everything that's coming out of snapshot
var name = snapshot.val().name;
var destination = snapshot.val().destination;
var firsttrain = snapshot.val().firsttrain;
var frequency = snapshot.val().frequency;

  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().firsttrain);
  console.log(snapshot.val().frequency);
// Change the HTML to reflect

var now = moment();
var firsttraintime = moment(firsttrain,"hh:mm");
var difference = now.diff((firsttrain), "minutes");
var remaining = difference % frequency;
var minutesaway = frequency - remaining;
var next = moment().add(minutesaway, "minutes");
var nextarrival = moment(next).format("hh:mm a");

//console.log(now);
//console.log(firsttraintime);
console.log(firsttraintime);
console.log(nextarrival);
console.log(minutesaway);

$("#train-table").find("tbody").append("<tr>"+"<td>" + name + "</td>" 
+"<td>" + destination + "</td>" 
+"<td>" + frequency + "</td>"
+"<td>" + nextarrival + "</td>" 
+"<td>" + minutesaway + "</td>"  
+ "</tr>")

});