'use strict';

// Global variables
let video;
let poseNet;
let ball;
let poses = [];
let modelLoaded = false;

function setup() {
  // Create canvas
  createCanvas(500, 500);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create poseNet method
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
}

// Function that tells that the model is ready
function modelReady() {
  document.querySelector("#status").textContent = "Model Loaded";
  modelLoaded = true;
}

// Function that draws when the model is ready
function draw() {
  if (modelLoaded) {
    image(video, 0, 0, width, height);
  }
}

// Function that draws the skeleton
function drawSkeleton() {
  // Detected skeletons loop
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // Body connections loop
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      
      // Limbs calculations
      spriteX = (partA.position.x + partB.position.x) / 2;
      spriteY = (partA.position.y + partB.position.y) / 2;
      distance = dist(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
      angle = atan(
        (partA.position.y - partB.position.y) /
          (partA.position.x - partB.position.x)
      );
      // Limbs
      sprite = new limbs.Sprite(spriteX, spriteY, distance, width * 0.015);
      sprite.rotation = angle;
    }
  }
}