<template>
  <div>
    <canvas id="myCanvas" width="480" height="320"></canvas>
  </div>
</template>

<script>
export default {
  name: "breakout",
  mounted() {
    this.hasNavigatedAway = false;
    this.runBreakout();
  },
  beforeDestroy(){
    this.hasNavigatedAway = true
  },
  data() {
    return {
      hasNavigatedAway:false
    }
  },
  methods: {
    runBreakout: function() {
      var that = this;
      var brickRowCount = 3;
      var brickColumnCount = 5;
      var brickWidth = 75;
      var brickHeight = 20;
      var brickPadding = 10;
      var brickOffsetTop = 30;
      var brickOffsetLeft = 30;
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var x = canvas.width / 2;
      var y = canvas.height - 50;
      var ballRadius = 10;
      var dx = 2;
      var dy = -2;
      var paddleHeight = 10;
      var paddleWidth = 75;
      var paddleX = (canvas.width - paddleWidth) / 2;
      var rPressed = false;
      var lPressed = false;
      var count = 0;
      var speed = 2;
      var score = 0;
      var bricks = [];
      var lives = 3;
      document.addEventListener("keydown", keyDownHandler, false);
      document.addEventListener("keyup", keyUpHandler, false);
      document.addEventListener("mousemove", mouseMoveHandler, false);

      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, visible: true };
        }
      }
      function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (
          relativeX - paddleWidth / 2 > 0 &&
          relativeX < canvas.width - paddleWidth / 2
        ) {
          paddleX = relativeX - paddleWidth / 2;
        }
      }
      function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
      }
      function keyDownHandler(e) {
        if (e.keyCode == 39) {
          rPressed = true;
        } else if (e.keyCode == 37) {
          lPressed = true;
        }
      }

      function keyUpHandler(e) {
        if (e.keyCode == 39) {
          rPressed = false;
        } else if (e.keyCode == 37) {
          lPressed = false;
        }
      }
      function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
      }

      function drawPaddle() {
        ctx.beginPath();
        ctx.rect(
          paddleX,
          canvas.height - paddleHeight,
          paddleWidth,
          paddleHeight
        );
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
      var keepGoing = !this.hasNavigatedAway;
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        checkBoundries();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        x += dx;
        y += dy;

        if (rPressed && paddleX < canvas.width - paddleWidth) {
          paddleX += 7;
        } else if (lPressed && paddleX > 0) {
          paddleX -= 7;
        }
        console.log(keepGoing);
        if(keepGoing){
          // requestAnimationFrame(draw);
        }
      }

      function checkBoundries() {
        if (x >= canvas.width - ballRadius) {
          dx = -speed;
        }
        if (x <= ballRadius) {
          dx = speed;
        }
        if (
          y >= canvas.height - ballRadius - paddleHeight &&
          x > paddleX &&
          x < paddleX + paddleWidth
        ) {
          dy = -speed;
          count++;
          if (count >= 5) {
            speed++;
            count = 0;
          }
        } else if (y >= canvas.height - ballRadius) {
          lives--;
          if (!lives) {
            alert("GAME OVER");
            document.location.reload();
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
        if (y <= ballRadius) {
          dy = speed;
        }
      }
      function drawBricks() {
        for (c = 0; c < brickColumnCount; c++) {
          for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].visible) {
              var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
              var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#269900";
              ctx.fill();
              ctx.closePath();
            }
          }
        }
      }
      function collisionDetection() {
        for (c = 0; c < brickColumnCount; c++) {
          for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.visible) {
              if (
                x > b.x &&
                x < b.x + brickWidth &&
                y > b.y - ballRadius &&
                y < b.y + brickHeight + ballRadius
              ) {
                dy = -dy;
                b.visible = false;
                score++;
                if (score == brickRowCount * brickColumnCount) {
                  alert("YOU WIN, CONGRATULATIONS!");
                  document.location.reload();
                }
              }
            }
          }
        }
      }
      function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("Score: " + score, 8, 20);
      }
      draw();
    }
  }
};
</script>