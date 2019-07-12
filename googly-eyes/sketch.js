/* googly-eyes
Draw googly eyes on a video. Detect the eyes using posenet from ml5.js.
*/

// Globals
let video;
let poseNet;
let poses = [];

// Video screen size
const width = 480
const height = 360

//Setup canvas
function setup() {
  createCanvas(width, height);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  video.hide();
}

// set status when loaded
function modelReady() {
  select('#status').html('Smile');
}

// This function repeats
function draw() {
  image(video, 0, 0, width, height);
  googly();
}

// Loop over all poses. If a pose is found, look for left and right
// eye. Draw a googly eye on those.
function googly() {
  for (i=0; i<poses.length; i++){
    for (j=0; j < poses[i].pose.keypoints.length; j++){
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.part == "leftEye"){
        let lx = keypoint.position.x
        let ly = keypoint.position.y
        fill(255, 255, 255)
        ellipse(lx, ly, 45, 45)
        fill(0,0,0)
        ellipse(lx + int(random(-7,7)), ly + int(random(-7,7)), 15, 15)
      }
      if (keypoint.part == "rightEye"){
        let rx = keypoint.position.x
        let ry = keypoint.position.y
        fill(255, 255, 255)
        ellipse(rx, ry, 45, 45)
        fill(0,0,0)
        ellipse(rx + int(random(-7,7)), ry + int(random(-7,7)), 15, 15)
      }
    }
  }
}

// set results to poses
function gotPoses(results) {
  poses = results;
}