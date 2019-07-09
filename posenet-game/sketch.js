/* posenet-game
The video is mirrored. Bring the right wrist to the top-left corner and the 
left write to the bottom right. When both wrist are brought into the right 
position a secret message is show above the video.
*/

// Globals
let video;
let poseNet;
let poses = [];
let skeletons = [];

// Will be set to true if hands are in the correct position
let leftHandOK = false;
let rightHandOK = false;
let showMessage = false

// Video screen size
const width = 960
const height = 720

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
  select('#status').html('Get in position!');
}

// This function repeats
function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
  // show secret message or not
  if (showMessage == true){
    select("#status").html("Sectret Message");
  } else{
    select('#status').html('Get in position!');
  }
}

// Draw keypoints (joints + facial marker)
// and check if skeleton is in position.
function drawKeypoints()  {
  let radius = 20
  for (let i = 0; i < poses.length; i++) {
    let leftHandOK = false
    let rightHandOK = false
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(200, 50, 50);
        radius = 20

        if (keypoint.part == "rightWrist"){
          if (keypoint.position.x < 0.25 * width & 
              keypoint.position.y < 0.25 * height){
            leftHandOK = true
            fill(50, 175, 50)
            radius = 40
          } 
        } 

        if (keypoint.part == "leftWrist"){
          if (keypoint.position.x > 0.75 * width & 
              keypoint.position.y > 0.75 * height){
            rightHandOK = true
            fill(50, 175, 50)
            radius = 40
          }
        }

        // If conditions are met, a secret message will be shown
        if (leftHandOK == true && rightHandOK == true){
          showMessage = true
        }
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, radius, radius);
      }
    }
  }
}

// set results to poses
function gotPoses(results) {
  poses = results;
}