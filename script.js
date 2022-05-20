
// Navigation bar Javascript
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

// Accordion Javascript
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

let myName = "Nikolai";
let firstlink = document
.getElementsByTagName("a")[0];
firstlink.innerHTML = myName;

let secondlink = "INF";
firstlink = document
.getElementsByTagName("a")[1];
firstlink.innerHTML = secondlink;

let thirdlink = "MAT";
firstlink = document
.getElementsByTagName("a")[2];
firstlink.innerHTML = thirdlink;

let fourthlink = "DAN";
firstlink = document
.getElementsByTagName("a")[3];
firstlink.innerHTML = fourthlink;

let fithlink = "ENG";
firstlink = document
.getElementsByTagName("a")[4];
firstlink.innerHTML = fithlink;

let sixthlink = "...";
firstlink = document
.getElementsByTagName("a")[5];
firstlink.innerHTML = sixthlink;

let seventhlink = "FYS";
firstlink = document
.getElementsByTagName("a")[6];
firstlink.innerHTML = seventhlink;

let eigthlink = "KEMI";
firstlink = document
.getElementsByTagName("a")[7];
firstlink.innerHTML = eigthlink;

let ninethlink = "SO";
firstlink = document
.getElementsByTagName("a")[8];
firstlink.innerHTML = ninethlink;

let title = document
.getElementsByTagName("title")[0];
title.innerHTML = myName + "s Logbog";