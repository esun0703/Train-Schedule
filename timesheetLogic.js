  console.log("js")
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDTq5EfIy-zTTvhSuLYffsDebnPn4XiXGo",
    authDomain: "trainschedule-713c0.firebaseapp.com",
    databaseURL: "https://trainschedule-713c0.firebaseio.com",
    storageBucket: "trainschedule-713c0.appspot.com",
    messagingSenderId: "828261394159"
  };

  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();



$("#add-train-btn").on("click", function() {

//data that we are capturing
	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();

	var firstTrainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
	var trainFrequency = $("#frequency-input").val().trim();

	database.ref().push({
		trainName:trainName,
		trainDestination:trainDestination,
		firstTrainTime:firstTrainTime,
		trainFrequency:trainFrequency,
	});
	
});


database.ref().on("child_added", function(childSnapShot){
			console.log("on child added called");
			//log everything thats coming out of 
			console.log(childSnapShot.val().trainName);
			console.log(childSnapShot.val().trainDestination);
			console.log(childSnapShot.val().firstTrainTime);
			console.log(childSnapShot.val().trainFrequency);

			var childName = childSnapShot.val().trainName;
			var childDestination = childSnapShot.val().trainDestination;
			var childTime = childSnapShot.val().firstTrainTime;
			var childFrequency = childSnapShot.val().trainFrequency;
			
			var currentTime=moment();
			var convertedChildTime = moment.unix(childTime).format('hh:mm');
			var diffTime = moment().diff(moment(convertedChildTime, "X"), "minutes");
			var remainder = diffTime % childFrequency;
			//var trainNext = moment().diff(moment.unix(childTime, "X"), "months");
			var minUntilTrain = childFrequency - remainder;
			var nextTrain = moment().add(minUntilTrain, "minutes");



			$("#train-display").append("<tr><td>" + childName + "</td><td>" + childDestination + "</td><td>" + "Every " + childFrequency + " mins" + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + minUntilTrain + " minutes until arrival" + "</td>");

})