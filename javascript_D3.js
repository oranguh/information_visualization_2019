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



window.onload = redraw()

window.onresize = redraw()
function redraw(){
  width = (window.innerWidth);
  height = (window.innerHeight - 80);

  console.log(Math.abs(year_int))
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
    .transition()
    .attr("class", "svgContainer")
    .attr("width", width - 50)
    .attr("height", height);

barwidth = (width / data.length)

  d3.select("svg")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", function(d){
      return height - d["avg"]})
    .attr("height", function(d){
      return d["avg"]})
    .attr("width", function(d){
      return barwidth})
    .attr("x", function(d, n){
      return n * barwidth})
    .attr("fill", "blue");

  d3.select("svg")
    .selectAll("rect")
    .data(data)
    .transition()
    .attr("y", function(d){
      return height - d["avg"]})
    .attr("height", function(d){
      return d["avg"]})
    .attr("width", function(d){
      return barwidth})
    .attr("x", function(d, n){
      return n * barwidth})
    .attr("fill", "blue");
    // .text(function(d){
    //   return d["month"] + "    " + d["avg"]});

}

// from https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
window.onkeydown = checkKey;


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
  });
}
