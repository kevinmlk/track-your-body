// Global variables
let video;
let poseNet;
let ball;
let poses = [];
let modelLoaded = false;

function setup() {
  // Create canvas
  createCanvas(1020, 720);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create poseNet method
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
  video.hide();

  limbs = new Group(); // skeleton parts
  limbs.collider = "static";
  limbs.color = "blue";
  balls = new Group();
  world.gravity.y = 9;
  borders = new Group();
  borders.collider = "static";
  borders.color = "yellow";
  drawBorders();
  ball = new balls.Sprite(xSpot, ySpot, width * 0.05);
  balls.color = "red";
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
    limbs.removeAll(); // constantly removing the limbs or they would just multiply
    drawSkeleton();
    print(balls.length);
    cam = get();
    translate(cam.width, 0);
    scale(-1, 1);
    image(cam, 0, 0);
    if (ball.y > height) {
      //replace ball if it falls
      balls.cull(0);
      ball = new balls.Sprite(xSpot, ySpot, width * 0.05);
    }
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

function drawBorders() {
  xSpot = width * 0.25;
  ySpot = height * 0.35;
  border = new borders.Sprite(
    xSpot,
    ySpot + height * 0.04,
    width * 0.1,
    width * 0.01
  );
  border = new borders.Sprite(
    xSpot - width * 0.05,
    ySpot,
    width * 0.01,
    height * 0.1
  );
  border = new borders.Sprite(
    xSpot + width * 0.05,
    ySpot,
    width * 0.01,
    height * 0.1
  );

  xSpot = width * 0.75;
  ySpot = height * 0.55;
  border = new borders.Sprite(
    xSpot,
    ySpot + height * 0.04,
    width * 0.1,
    width * 0.01
  );
}