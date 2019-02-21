url = "https://web.damitha.xyz/stravaapi/activities/run/weekly";

d3.json(url, function(data) {
  var margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
  },
  width = 1000 - margin.left - margin.right,
  height = 200 - margin.top - margin.bottom;


  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);
  

  var y = d3.scaleLinear()
    .range([height, 0]);
  
  var yHR = d3.scaleLinear()
    .range([height, 0]);
  
  var ySpeed = d3.scaleLinear()
    .range([height, 0])
    .clamp(true);

  var xAxis = d3.axisBottom()
    .scale(x)
  

  var yAxis = d3.axisLeft()
    .scale(y)
  var yHRAxis = d3.axisLeft()
    .scale(yHR)

/*  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "distance: " + (d.totaldistance/1000).toFixed(2) + "km</br>runs: " + d.count + "";
    })
*/
 
//Weekly Runs
  var svg = d3.select("#weekly-runs").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 // svg.call(tip);



  //d3.tsv("data.tsv", type, function(error, data) {
  x.domain(data.map(function(d) {
    return d._id.week;
  }));
  var specifier = "%M:%S";

  var scale = d3.scaleTime()
  .domain(d3.extent(data));
  
  var ySpeedAxis = d3.axisRight(scale)
    .tickValues(data)
    .tickFormat(function(d){
        return d3.timeFormat(specifier)(d)
    });
  
  y.domain([0, d3.max(data, function(d) {
    return d.totaldistance;
  })]);
  yHR.domain([140, d3.max(data, function(d) {
    return d.avgHR;
  })]);
  ySpeed.domain([2.2, d3.max(data, function(d) {
    return d.avgSpeed;
  })]);


  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Total Distance");

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d._id.week);
    })
    .attr("width", x.bandwidth())
    .attr("y", function(d) {
      return y(d.totaldistance);
    })
    .attr("height", function(d) {
      return height - y(d.totaldistance);
    })

//Weekly Performance
  var svg_performance = d3.select("#weekly-performance").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




  //d3.tsv("data.tsv", type, function(error, data) {

  svg_performance.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


  svg_performance.append("g")
    .attr("class", "y axis")
    .call(yHRAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Average Heart Rate");

  svg_performance.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (width)  + " ,0)")	
    .call(ySpeedAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -12)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Average Speed");


var valueline = d3.line()
    .x(function(d) { return x(d._id.week); })
    .y(function(d) { return yHR(d.avgHR); });

var valuelineSpeed = d3.line()
    .x(function(d) { return x(d._id.week); })
    .y(function(d) { return scale(d.avgSpeedTime)});

  svg_performance.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#af111c")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", valueline);
  
svg_performance.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", valuelineSpeed);





});



//});

function type(d) {
  d.totaldistance = +d.totaldistance;
  return d;
}

