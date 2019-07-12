// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

// The SketchRNN sk_model
let sk_model;
// Start by drawing
let previous_pen = 'down';
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;
let vars = getUrlVars();


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// For when SketchRNN is fixed
function preload() {
    console.log(vars);
  // See a list of all supported sk_models: https://github.com/ml5js/ml5-library/blob/master/src/SketchRNN/sk_models.js
  sk_model = ml5.sketchRNN(vars.model);
}

function setup() {
  createCanvas(640, 480);
  background(220);

  // Button to reset drawing
  let button = createButton('clear');
  button.mousePressed(startDrawing);
  
  // run sketchRNN
  startDrawing();
}

function sk_modelReady() {
  console.log('sk_model loaded');
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  background(220);
  // Start in the middle
  x = width / 2;
  y = height / 2;
  sk_model.reset();
  // Generate the first stroke path
  sk_model.generate(gotStroke);
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      sk_model.generate(gotStroke);
    }
  }
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}
