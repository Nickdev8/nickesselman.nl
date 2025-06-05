<div id="pongtable" class="overlay-menu physics-fixed">
    <div class="pong-header">
        <h2>Pong</h2>
        <button class="close-button" onclick="
                localStorage.setItem('pong', 'false');
                document.getElementById('pong').checked = false;
                document.getElementById('pong-container').remove();
            ">&times;</button>
    </div>
    <div class="game-container">
        <canvas id="pongcanvas" width="1000" height="600"></canvas>
    </div>
</div>

<style>
    #pongtable {
        position: fixed;
        width: 70vw;
        max-height: 80vh;
        height: fit-content;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: rgba(21, 76, 23, 0.9);
        z-index: 1000;
        opacity: 1 !important;
        color: white;
        border-radius: 10px;
        border: 2px solid rgb(35, 117, 38);
    }

    .pong-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4vh;
        border-bottom: 1px solid rgb(46, 162, 50);
    }

    .game-container {
        max-height: calc(100% - 4vh);
        display: flex;
        flex: 1;
        justify-content: space-around;
        flex-direction: row;
        border: 2px solid rgb(46, 162, 50);
    }

    canvas {
        width: 100%;
        max-height: calc(80vh - 8vh);

        background: black;
        display: block;
        margin: auto;
    }
</style>


<script>
    const canvas = document.getElementById("pongcanvas");
    const keys = {};
    let canvasHovered = false;

    // Track mouse hover state on the canvas
    canvas.addEventListener("mouseenter", () => {
        canvasHovered = true;
    });
    canvas.addEventListener("mouseleave", () => {
        canvasHovered = false;
    });

    window.addEventListener("keydown", (e) => {
        if (canvasHovered && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
        }
        keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key] = false;
    });

    if (!canvas) {
        console.error("pongCanvas element not found!");
    } else {
        console.log("pongCanvas element found, initializing game...");
        const ctx = canvas.getContext("2d");
        const maxBounceAngle = Math.PI / 4; // Define maxBounceAngle (45° in radians)

        const paddleWidth = 10,
            paddleHeight = 75;
        const ballSize = 10;
        const leftPaddle = {
            x: 10,
            y: canvas.height / 2 - paddleHeight / 2,
            speed: 5,
        },
            rightPaddle = {
                x: canvas.width - paddleWidth - 10,
                y: canvas.height / 2 - paddleHeight / 2,
                speed: 5,
            },
            ball = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: 3,
                vy: 3,
            };

        function update() {
            if (keys["w"] || keys["W"]) {
                leftPaddle.y -= leftPaddle.speed;
                if (leftPaddle.y < 0) leftPaddle.y = 0;
            }
            if (keys["s"] || keys["S"]) {
                leftPaddle.y += leftPaddle.speed;
                if (leftPaddle.y + paddleHeight > canvas.height)
                    leftPaddle.y = canvas.height - paddleHeight;
            }
            if (keys["ArrowUp"]) {
                rightPaddle.y -= rightPaddle.speed;
                if (rightPaddle.y < 0) rightPaddle.y = 0;
            }
            if (keys["ArrowDown"]) {
                rightPaddle.y += rightPaddle.speed;
                if (rightPaddle.y + paddleHeight > canvas.height)
                    rightPaddle.y = canvas.height - paddleHeight;
            }

            ball.x += ball.vx;
            ball.y += ball.vy;

            if (ball.y < 0 || ball.y + ballSize > canvas.height)
                ball.vy = -ball.vy;

            if (
                ball.x <= leftPaddle.x + paddleWidth &&
                ball.y + ballSize >= leftPaddle.y &&
                ball.y <= leftPaddle.y + paddleHeight
            ) {
                // Find the collision point:
                const paddleCenter = leftPaddle.y + paddleHeight / 2;
                const ballCenter = ball.y + ballSize / 2;
                const relativeIntersectY = ballCenter - paddleCenter;
                // Normalize: -1 (top edge) to 1 (bottom edge)
                const normalizedRelativeIntersectionY = relativeIntersectY / (paddleHeight / 2);
                // Calculate bounce angle
                const bounceAngle = normalizedRelativeIntersectionY * maxBounceAngle;

                // Calculate the ball's speed (magnitude)
                const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                // Reverse X velocity and update with angle
                ball.vx = speed * Math.cos(bounceAngle);
                ball.vy = speed * Math.sin(bounceAngle);

                // Adjust ball.x to avoid sticking to the paddle
                ball.x = leftPaddle.x + paddleWidth;
            }

            if (
                ball.x + ballSize >= rightPaddle.x &&
                ball.y + ballSize >= rightPaddle.y &&
                ball.y <= rightPaddle.y + paddleHeight
            ) {
                // Find the collision point:
                const paddleCenter = rightPaddle.y + paddleHeight / 2;
                const ballCenter = ball.y + ballSize / 2;
                const relativeIntersectY = ballCenter - paddleCenter;
                // Normalize: -1 (top edge) to 1 (bottom edge)
                const normalizedRelativeIntersectionY = relativeIntersectY / (paddleHeight / 2);
                // Calculate bounce angle
                const bounceAngle = normalizedRelativeIntersectionY * maxBounceAngle;

                // Calculate the ball's speed (magnitude)
                const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                // Reverse X velocity (ball now heads left) and adjust with angle
                ball.vx = -speed * Math.cos(bounceAngle);
                ball.vy = speed * Math.sin(bounceAngle);

                // Adjust ball.x to avoid sticking to the paddle
                ball.x = rightPaddle.x - ballSize;
            }

            if (ball.x < 0 || ball.x > canvas.width) {
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                ball.vx = -ball.vx;
            }
        }

        function draw() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
            ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);
            ctx.fillRect(ball.x, ball.y, ballSize, ballSize);
        }

        function gameLoop() {
            console.log("Game loop running");
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }
</script>