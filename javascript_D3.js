var year_int = 0
var years = []
var display_data = []
var uninitialized = true
var margins = {"right": 50, "left":50, "bottom": 50, "top": 50};
var max_temp = 20

var width = (window.innerWidth - 30) - (margins.left + margins.right);
var height = (window.innerHeight - 30) -(margins.top + margins.bottom);

var bloop = 0
var data = []
// var csv_path = "https://oranguh.github.io/information_visualization_2019/meteo.csv"
var csv_path = "meteo.csv"
var barwidth = (width / 12)
// var initialized = false
load_csv_data()

function initialized(){

  window.onload = redraw()

}
// from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
window.onkeydown = checkKey;
window.onresize = redraw()

function redraw(){
  width = (window.innerWidth - 30) - margins.left - margins.right
  height = (window.innerHeight - 30) - margins.top - margins.bottom;

  // console.log(years[year_int])
  if (display_data[year_int]){
    data = display_data[year_int]["months"]
    max_avg = d3.max(data.map(x => x["avg"]))
  }


d3.select("body").select("svg")
  .attr("class", "svgContainer")
  .attr("width", Math.round(width + margins.left + margins.right))
  .attr("height", Math.round(height + margins.top + margins.bottom))
.select("g")
  .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

d3.select("body").select("svg").select("g")
  .selectAll("text")
  .data(years)
  .enter()
  .append("text")
  .attr("class", "year_labels")
  .text(function(d){
    return (d)})
  .attr("x", function(d, n){
    return 50*n + 100
  })
  .attr("y", 50)
  .attr("fill", function(d, n){
    if (n === year_int) {
      return "red"
    } else {
      return "blue"
    }});

d3.select("body").select("svg").select("g")
  .selectAll(".year_labels")
  .transition()
  .attr("fill", function(d, i){
    if (i === year_int) {
      return "red"
    } else {
      return "blue"}});

      // just implement this >.> https://bl.ocks.org/d3indepth/fabe4d1adbf658c0b73c74d3ea36d465
    var xScale = d3.scaleOrdinal()
        .range(linspace(0, width, data.length))
        .domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
    var yScale = d3.scaleLinear()
        .domain([0, max_temp])
        .range([height, 0])
        // .ticks(20, "s");

if (bloop < 2){

    d3.select("body").select("svg").select("g")
        .append("text")
        .text("Schiphol Airport Temperatures")
        .attr("x", 100)

    d3.select("svg").select("g").append("g")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale))

    d3.select("svg").select("g").append("g")
        .attr("class", "y_axis")
        .attr("transform", "translate(0, 0)")
        .call(d3.axisLeft(yScale).ticks(20, "s"))


} else {
  d3.select("svg").select("g").select(".x_axis")
      .transition()
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(xScale))

  d3.select("svg").select("g").select(".y_axis")
      .transition()
      .attr("transform", "translate(0 , 0)")
      .call(d3.axisLeft(yScale).ticks(20, "s"))
}


barwidth = Math.round(width / data.length )
  d3.select("svg").select("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d){
      return Math.round(height - height*(d["avg"]/(max_temp*10)))})
    .attr("height", function(d){
      return Math.round(height*(d["avg"]/(max_temp*10)))})
    .attr("width", function(d){
      return barwidth})
    .attr("x", function(d, n){
      return Math.round(n * barwidth)})
    .attr("fill", function(d) {
  return "rgb(0, 0, " + (d["avg"]/(max_temp*10)*255) + ")"});


  d3.select("svg").select("g")
    .selectAll(".bar")
    .data(data)
    .transition()
    .attr("y", function(d){
      return Math.round(height - height*d["avg"]/(max_temp*10))})
    .attr("height", function(d){
      return Math.round(height*d["avg"]/(max_temp*10))})
    .attr("width", function(d){
      return barwidth})
    .attr("x", function(d, n){
      return Math.round(n * barwidth)})
    .attr("fill", function(d) {
      if (d["avg"]/(max_temp*10) > 0.5){
        return "rgb(" + (d["avg"]/(max_temp*10)*255) + ", 0, " + ((1 - d["avg"]/(max_temp*10)) * 255) + ")"
      } else {
        return "rgb(" + (d["avg"]/(max_temp*10)*255) + ", 0, " + ((1 - d["avg"]/(max_temp*10)) * 255) + ")"
      }
      });


if (bloop < 2){
    d3.select("body").select(".svgContainer").select("g")
      .selectAll("text2")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "month_labels")
      .text(function(d){
        return String(d["avg"]*0.1).substring(0,4)})
      .attr("y", function(d){
          return Math.round(height - height*d["avg"]/(max_temp*10))})
      .attr("x", function(d, n){
          return Math.round(n * barwidth + barwidth/3)})
}

else {
  d3.select("body").select(".svgContainer").select("g")
    .selectAll(".month_labels")
    .data(data)
    .transition()
    .attr("y", function(d){
        return Math.round(height - height*d["avg"]/(max_temp*10))})
    .attr("x", function(d, n){
        return Math.round(n * barwidth + barwidth/3)})
    .text(function(d){
      return String(d["avg"]*0.1).substring(0,4)})
}
    bloop += 1
}



function checkKey(e) {
// from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
      year_int = (year_int-1)%5
      if (year_int === -1){
        year_int = 4
      }
      var data = display_data[year_int]
      redraw()
       // left arrow
    }
    else if (e.keyCode == '39') {
      year_int = (year_int+1)%5
      var data = display_data[year_int]
      redraw()
       // right arrow
    }
}

function load_csv_data(){
  d3.csv(csv_path).then(function(data) {
    for (i in data) {
      // console.log(data[i]["year"])
      // console.log(isNaN(data[i]["year"]))
      if (isNaN(data[i]["year"])) {
        continue
      }
      if (!(years.includes(data[i]["year"]))) {
        var template = {"year": data[i]["year"], "months":[]}
        // console.log(template)
        display_data.push(template)
        years.push(data[i]["year"]);
      }
      month_int = Number(data[i]["month"])-1

      // console.log(display_data.find(datum => datum.year === data[i]["year"])["months"][month_int])
      if (!display_data.find(datum => datum.year === data[i]["year"])["months"][month_int]){
        display_data.find(datum => datum.year === data[i]["year"])["months"][month_int] = {"month": data[i]["month"], "all_temp": [], "avg": 0}
      }
      display_data.find(datum => datum.year === data[i]["year"])["months"][month_int]["all_temp"].push(data[i]["temperature"])
      // console.log(display_data[display_data.length -1])
    }

    for (year_indicator in display_data){
      for (month_int in display_data[year_indicator]["months"]){
        var total = 0;
        for(var i = 0; i < display_data[year_indicator]["months"][month_int]["all_temp"].length; i++) {
            total += Number(display_data[year_indicator]["months"][month_int]["all_temp"][i]);
        }
        var avg = total / display_data[year_indicator]["months"][month_int]["all_temp"].length;
        display_data[year_indicator]["months"][month_int]["avg"] = avg
      }
    }
    // console.log(display_data)
    initialized()
  });
}

function linspace(start, stop, num_samples) {
  // https://calebmadrigal.com/simple-d3-demos/
  return d3.range(start, stop * (num_samples / (stop-start)))
    .map(function (n) { return n / (num_samples / (stop-start)); });
};
