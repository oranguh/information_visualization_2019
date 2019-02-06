






















var requester = new XMLHttpRequest();
var gitthingy = "https://oranguh.github.io/dataprocessing/Homework/Week_3/enron.json";
// var gitthingy = "enron.json"
requester.addEventListener("load", reqListener);
requester.open("GET", gitthingy);
requester.send();
