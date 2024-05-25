'use strict';

// Global variables
let video;
let poseNet;
let ball;
let poses = [];
let modalLeaded = false;

const setup = () => {
  console.log('Conent loaded');
}

// Function that tells that the modal is ready
const modalReady = () => {
  console.log('modal ready');
  modalLeaded = true;
}

window.addEventListener('DOMContentLoaded', setup);