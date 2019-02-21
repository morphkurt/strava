
var weeklyData;

function loadData() {
	$.getJSON( "https://web.damitha.xyz/stravaapi/activities/run/weekly", function( json ) {
  		weeklyData=json;
 	});
}

$( document ).ready(function() {
	loadData();
});



