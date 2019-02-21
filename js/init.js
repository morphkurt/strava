
var weeklyData;

function loadData() {
	$.getJSON( "https://web.damitha.xyz/stravaapi/activities/run/weekly", function( json ) {
  		weeklyData=json;
  		renderWeeklyLoadGraph(weeklyData);
  		renderWeeklyPerformanceGraph(weeklyData);
	});
}


$( document ).ready(function() {
	loadData();
	//renderWeeklyPerformanceGraph(weeklyData);
});



