var year_int = 0
var years = []
var display_data = []
var width = (window.innerWidth);
var height = (window.innerHeight - 80);
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
  width = (window.innerWidth);
  height = (window.innerHeight - 80);

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
    return 50*i
  })
  .attr("y", 50)
  .attr("fill", function(d, i){
    if (i === year_int) {
      return "red"
    } else {
      return "blue"}});

d3.select("body").select("svg")
  .selectAll(".year_labels")
  .transition()
  .attr("fill", function(d, i){
    if (i === year_int) {
      return "red"
    } else {
      return "blue"}});

  d3.select("body").select("svg")
    .transition()
    .attr("class", "svgContainer")
    .attr("width", Math.round(width - 50))
    .attr("height", Math.round(height));

barwidth = Math.round(width / data.length)

  d3.select("svg")
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

  d3.select("svg")
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
