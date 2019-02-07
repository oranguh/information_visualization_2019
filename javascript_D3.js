var year_int = 0
var years = []
var display_data = []

var margins = {"right": 50, "left":50, "bottom": 50, "top": 50};

var width = (window.innerWidth - 30) - (margins.left + margins.right);
var height = (window.innerHeight - 30) -(margins.top + margins.bottom);

var data = []
var csv_path = "https://oranguh.github.io/information_visualization_2019/meteo.csv"
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

  console.log(years[Math.abs(year_int)])
  if (display_data[Math.abs(year_int)]){
    data = display_data[Math.abs(year_int)]["months"]
  }
  console.log(data)
  console.log(display_data)
// console.log(initialized)
// if (!initialized){
//   d3.select("body").append("svg")
//     .attr("class", "svgContainer")
//     .attr("width", width - 50)
//     .attr("height", height);
//
//   initialized = true
// }
// console.log(initialized)
d3.select("body").select("svg")
  .attr("class", "svgContainer")
  .attr("width", Math.round(width + margins.left + margins.right))
  .attr("height", Math.round(height + margins.top + margins.bottom))
.append("g")
  .attr("transform", "translate(" + margins.left + "," + margins.top + ")");


d3.select("body").select("svg").select("g")
  .selectAll("text")
  .data(years)
  .enter()
  .append("text")
  .transition()
  .attr("class", "year_labels")
  .attr("font-family", "sans-serif")
  .attr("font-size", "15px")
  .attr("font-weight", "bold")
  .text(function(d){
    return (d)})
  .attr("x", function(d, i){
    return 50*i + 100
  })
  .attr("y", 50)
  .attr("fill", function(d, i){
    if (i === year_int) {
      return "red"
    } else {
      return "blue"}});

d3.select("body").select("svg").select("g")
  .selectAll(".year_labels")
  .transition()
  .attr("fill", function(d, i){
    if (i === year_int) {
      return "red"
    } else {
      return "blue"}});

    var xScale = d3.scaleLinear()
        .domain([0, data.length-1])
        .range([0, width]);

    d3.select("svg").select("g").append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale));

    // var xs = d3.scaleOrdinal()
    //     .range([0, width])
        // .attr("transform", "translate(0," + height + ")");

    var ys = d3.scaleLinear()
        .domain([250, 0])
        .range([0, height]);

    // make them axes

      // .call(d3.axisBottom(xs));

    // d3.select("svg")
    //     .call(d3.axisLeft(ys))





barwidth = Math.round(width / data.length )
console.log(data.length)
  d3.select("svg").select("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("y", function(d){
      return Math.round(height - d["avg"])})
    .attr("height", function(d){
      return Math.round(d["avg"])})
    .attr("width", function(d){
      return barwidth})
    .attr("x", function(d, n){
      return Math.round(n * barwidth)})

  d3.select("svg").select("g")
    .selectAll(".bar")
    .data(data)
    .transition()
    .attr("y", function(d){
      return Math.round(height - d["avg"])})
    .attr("height", function(d){
      return Math.round(d["avg"])})
    .attr("width", function(d){
      return barwidth})
    .attr("x", function(d, n){
      return Math.round(n * barwidth)})
    .attr("fill", "blue");
    // .text(function(d){
    //   return d["month"] + "    " + d["avg"]});

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

    for (year_int in display_data){
      for (month_int in display_data[year_int]["months"]){
        // console.log(display_data[year_int]["months"][month_int]);
        var total = 0;
        for(var i = 0; i < display_data[year_int]["months"][month_int]["all_temp"].length; i++) {
            total += Number(display_data[year_int]["months"][month_int]["all_temp"][i]);
        }
        var avg = total / display_data[year_int]["months"][month_int]["all_temp"].length;
        display_data[year_int]["months"][month_int]["avg"] = avg
      }
    }
    // console.log(display_data)
    initialized()
  });
}
