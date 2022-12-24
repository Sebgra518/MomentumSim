var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var elastic = document.getElementById("elasticButton");
var inelastic = document.getElementById("inelasticButton");

var block1VelocityDisplay = document.getElementById("blueVelocityDisplay").innerHTML;
var block2VelocityDisplay = document.getElementById("redVelocityDisplay").innerHTML;

var blueMassInput = document.getElementById("blueMassInput");
var blueVelocityInput = document.getElementById("blueVelocityInput");

var redMassInput = document.getElementById("redMassInput");
var redVelocityInput = document.getElementById("redVelocityInput");

var elastic = true;

var block1PosX = 10;
var block2PosX = 150;

var block1Mass = 1;
var block2Mass = 1;

var block1Velocity = 0;
var block2Velocity = 0;

//Shift + Alt + F to clean up code

function moveCubes() {
  block1PosX += block1Velocity;
  block2PosX += block2Velocity;
  update();
}
function drawBlock1() {
  ctx.beginPath();
  ctx.rect(block1PosX, 130, 20, 20);
  ctx.stroke();
  ctx.fillStyle = "blue";
  ctx.fill();
}
function drawBlock2() {
  ctx.beginPath();
  ctx.rect(block2PosX, 130, 20, 20);
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();
}
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function update() {
  clear();
  drawBlock1();
  drawBlock2();
}
function checkCollision() {
  if (block1PosX + 21 >= block2PosX) {
    return true;
  } else {
    return false;
  }
}
function startSimulation() {
  if (inelastic.checked) {
    elastic = false;
    var finalVelocity = 0;
    var finalVelocity2 = 0;
  }

  block1Mass = parseInt(blueMassInput.value);
  block1Velocity = parseInt(blueVelocityInput.value);
  block2Mass = parseInt(redMassInput.value);
  block2Velocity = parseInt(redVelocityInput.value);
  if (
    isNaN(block1Mass) ||
    isNaN(block2Mass) ||
    isNaN(block1Velocity) ||
    isNaN(block2Velocity)
  ) {
    block1Mass = 1;
    block2Mass = 1;
    block1Velocity = 1;
    block2Velocity = 0;
  }

  setInterval(function () {
    if (checkCollision() && !elastic) {
      finalVelocity =
        (block1Mass * block1Velocity + block2Mass * block2Velocity) /
        (block1Mass + block2Mass);
      block1Velocity = finalVelocity;
      block2Velocity = finalVelocity;
    } else {
      if (checkCollision() && elastic) {
        finalVelocity =
          ((block1Mass - block2Mass) / (block1Mass + block2Mass)) *
            block1Velocity +
          ((2 * block2Mass) / (block1Mass + block2Mass)) * block2Velocity;
        finalVelocity2 =
          ((2 * block1Mass) / (block1Mass + block2Mass)) * block1Velocity -
          ((block1Mass - block2Mass) / (block1Mass + block2Mass)) *
            block2Velocity;
        block1Velocity = finalVelocity;
        block2Velocity = finalVelocity2;
      }
    }
    moveCubes();
    block1VelocityDisplay = block1Velocity;
    block2VelocityDisplay = block2Velocity;
  }, 50);
}

drawBlock1();
drawBlock2();
