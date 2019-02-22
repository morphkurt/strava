

function loadData() {
	$.getJSON( "https://web.damitha.xyz/stravaapi/activities/run/weekly", function( json ) {
  		let weeklyData=json;
  		renderWeeklyLoadGraph(weeklyData);
  		renderWeeklyPerformanceGraph(weeklyData);
  		renderWeeklyPerformanceSpeedGraph(weeklyData);
	});
}


$( document ).ready(function() {
	loadData();
	//renderWeeklyPerformanceGraph(weeklyData);
});



