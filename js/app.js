function renderWeeklyLoadGraph(data){
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
  
  var xAxis = d3.axisBottom()
    .scale(x)
  
  var yAxis = d3.axisLeft()
    .scale(y)

  x.domain(data.map(function(d) {
    return d._id.week;
  }));
 
//Weekly Runs
  var svg = d3.select("#weekly-runs").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  y.domain([0, d3.max(data, function(d) {
    return d.totaldistance;
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
}

function renderWeeklyPerformanceSpeedGraph(data){
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
  
  var xAxis = d3.axisBottom()
    .scale(x)
  
  var yAxis = d3.axisLeft()
    .scale(y)

  x.domain(data.map(function(d) {
    return d._id.week;
  }));
 
//Weekly Runs
  var svg = d3.select("#weekly-speed-performance").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  y.domain([2.1, d3.max(data, function(d) {
    return d.avgSpeed;
  })]);

 var clip = svg.append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", width)
                .attr("height", height);

  

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
    .text("Average Speed");

  var valueline = d3.line()
    .x(function(d) { return x(d._id.week); })
    .y(function(d) { return y(d.avgSpeed); });

  svg.append("path")
      .attr("clip-path", "url(#clip)")
      .data([data])
      .style("stroke","steelblue")
      .attr("class", "line")
      .attr("d", valueline);

}

function renderWeeklyPerformanceGraph(data){
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
  
  var xAxis = d3.axisBottom()
    .scale(x)
  
  var yAxis = d3.axisLeft()
    .scale(y)

  x.domain(data.map(function(d) {
    return d._id.week;
  }));
 
//Weekly Runs
  var svg = d3.select("#weekly-performance").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  y.domain([140, d3.max(data, function(d) {
    return d.avgHR;
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
    .text("Average HR");

  var valueline = d3.line()
    .x(function(d) { return x(d._id.week); })
    .y(function(d) { return y(d.avgHR); });

  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

}

function type(d) {
  d.totaldistance = +d.totaldistance;
  return d;
}

