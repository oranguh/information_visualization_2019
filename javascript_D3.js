function reqListener(){

  // var jsondata = JSON.parse(this.responseText);
  $(document).ready(function() {
     document.write("Hello, World!");
     console.log("hello3");
  });

  console.log("hello2");
  // jQuery.get('meteo.csv', function(data) {
  //    alert(data);
  //    //process text file line by line
  //    $('#body').html(data.replace('n',''));
  //    console.log("hello");
  //    console.log(data);
  // });

  }



















var requester = new XMLHttpRequest();
var gitthingy = "https://oranguh.github.io/information_visualization_2019/meteo.json";
// var gitthingy = "meteo.json"
requester.addEventListener("load", reqListener);
requester.open("GET", gitthingy);
requester.send();
