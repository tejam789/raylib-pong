import r from 'raylib';
import { WINDOW, BALL, BOUNDARY, PADDLE } from './constants.js';
import Paddle from './paddle.js';
import Ball from './ball.js';

const drawPaddles = (paddleY) => {
  r.DrawRectangle(
    PADDLE.OFFSET,
    paddleY,
    PADDLE.WIDTH,
    PADDLE.HEIGHT,
    PADDLE.COLOUR
  );

  r.DrawRectangle(
    WINDOW.WIDTH - PADDLE.OFFSET - PADDLE.WIDTH,
    WINDOW.HEIGHT / 2 - PADDLE.HEIGHT / 2,
    PADDLE.WIDTH,
    PADDLE.HEIGHT,
    PADDLE.COLOUR
  );
}

const getPaddleConfig = () => {
  const paddleMinY = BOUNDARY.THICKNESS;
  const paddleMaxY = WINDOW.HEIGHT - BOUNDARY.THICKNESS - PADDLE.HEIGHT;
  const initialPaddlePosition = (paddleMinY + paddleMaxY) / 2;

  return {
    paddleLimits: { top: paddleMinY, bottom: paddleMaxY },
    initialPaddlePosition,
  };
}

const getBallConfig = () => {
  const ballPosition = { x: WINDOW.WIDTH / 2, y: WINDOW.HEIGHT / 2 };
  const ballVelocity = { x: 1, y: 2 };
  const edge = BALL.RADIUS + BOUNDARY.THICKNESS;
  const ballLimits = {
    x: { min: BALL.RADIUS, max: WINDOW.WIDTH - BALL.RADIUS },
    y: { min: edge, max: WINDOW.HEIGHT - edge },
  };

  return { ballPosition, ballVelocity, ballLimits };
}

const drawBoundaries = () => {
  r.DrawRectangle(0, 0, WINDOW.WIDTH, BOUNDARY.THICKNESS, BOUNDARY.COLOUR);
  r.DrawRectangle(0, WINDOW.HEIGHT - BOUNDARY.THICKNESS, WINDOW.WIDTH, BOUNDARY.THICKNESS, BOUNDARY.COLOUR);
};

const drawCourt = () => {
  drawBoundaries();
  r.DrawLine(WINDOW.WIDTH / 2, 0, WINDOW.WIDTH / 2, WINDOW.HEIGHT, BOUNDARY.COLOUR);
}

const drawBall = ({x, y}) => {
  r.DrawCircle(x, y, BALL.RADIUS, BALL.COLOUR);
}

const handleKeyPress = (paddle) => {
  if (r.IsKeyDown(PADDLE.DOWN)) {
    paddle.moveDown();
  }
  if (r.IsKeyDown(PADDLE.UP)) {
    paddle.moveUp();
  }
  return paddle.position;
}

const main = () => {
  r.InitWindow(WINDOW.WIDTH, WINDOW.HEIGHT, 'Pong game');
  r.SetTargetFPS(WINDOW.FPS);

  const {paddleLimits, initialPaddlePosition} = getPaddleConfig();
  const {ballPosition, ballVelocity, ballLimits} = getBallConfig();
  const playerPaddle = new Paddle(paddleLimits, initialPaddlePosition);
  const ball = new Ball(ballLimits, ballPosition, ballVelocity);

  while (!r.WindowShouldClose()) {
    ball.move();
    const currentPaddlePosition = handleKeyPress(playerPaddle);

    r.BeginDrawing();
    r.ClearBackground(WINDOW.BACKGROUND_COLOUR);

    drawCourt();
    drawPaddles(currentPaddlePosition);
    drawBall(ball.position);

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
