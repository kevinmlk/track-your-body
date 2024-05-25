'use strict';

// Global variables
let video;
let poseNet;
let ball;
let poses = [];
let modelLoaded = false;

function setup() {
  createCanvas(500, 500);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();
}

// Function that tells that the modal is ready
function modelReady() {
  document.querySelector("#status").textContent = "Model Loaded";
  modelLoaded = true;
}

function draw() {
  if (modelLoaded) {
    image(video, 0, 0, width, height);
  }
}