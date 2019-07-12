/*
Use bodyPix() model to overlay all bodyparts with a
color exept for the head, color this white to 
hide it.
*/

let bodypix; let video; let segmentation; let img;

const options = {
    "outputStride": 16, // 8, 16, or 32, default is 16
    "segmentationThreshold": 0.5 // 0 - 1, defaults to 0.5 
}

// Setup webpage
function setup() {
    createCanvas(480, 360);
    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the video element, and just show the canvas
    bodypix = ml5.bodyPix(video, modelReady)
}

// Loade model and start inference
function modelReady() {
    console.log('ready!')
    bodypix.segmentWithParts(gotResults, options)
}

// Handle the results of the model
function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // If bodypart is face, color white
    result.bodyParts.leftFace.color = [255, 255, 255]
    result.bodyParts.rightFace.color = [255, 255, 255]
    segmentation = result;

    // Draw camera output converted by segmentation
    background(0);
    image(segmentation.image, 0, 0, width, height)

    // New inference
    bodypix.segmentWithParts(gotResults, options)
}