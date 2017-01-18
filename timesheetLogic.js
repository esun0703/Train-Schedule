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

	var firstTrainTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
	var trainFrequency = $("#rate-input").val().trim();

	database.ref().push({
		employeeName:employeeName,
		employeeRole:employeeRole,
		employeeStartDate:firebase.database.ServerValue.TIMESTAMP,
		employeeMonthRate:employeeMonthRate,
	});
	
});


database.ref().on("child_added", function(childSnapShot){
			console.log("on child added called");
			//log everything thats coming out of 
			console.log(childSnapShot.val().employeeName);
			console.log(childSnapShot.val().employeeRole);
			console.log(childSnapShot.val().employeeStartDate);
			console.log(childSnapShot.val().employeeMonthRate);

			var childName = childSnapShot.val().employeeName;
			var childRole = childSnapShot.val().employeeRole;
			var childDate = childSnapShot.val().employeeStartDate;
			var childRate = childSnapShot.val().employeeMonthRate;
			var childBilled

			var convertedChildDate = moment.unix(childDate).format('MM/DD/YY');

			var empMonths = moment().diff(moment.unix(childDate, "X"), "months");



			$("tbody").append("<tr>" +
				"<td>" +childName + "</td><td>" + childRole + "</td><td>" + childDate + "</td><td>" + empMonths + "</td><<td>" + childRate + "</td></tr>");


		});