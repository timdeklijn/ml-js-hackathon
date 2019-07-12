/* 

*/

// Globals
let video;
let yolo;
let status;
let objects = [];

// Video screen size
const width = 320
const height = 240

//Setup canvas
function setup() {
  createCanvas(width, height);
  video = createCapture(VIDEO);
  video.size(width, height);
  yolo = ml5.YOLO(video, startDetecting);
  video.hide();
  status = select("#status")
}

// This function repeats
function draw() {
  let people = 0
  image(video, 0, 0, width, height);
  for (i=0; i<objects.length; i++){
    if (objects[i].className == "person"){
      people++
    }
  }
  if (people > 0){
    status.html(`${people} people in frame`)
  } else{
    status.html(`Looking for people`)
  }
}

function startDetecting() {
  status.html('Loading model...');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}