import r from 'raylib';
import { WINDOW, BALL, BOUNDARY, PADDLE } from './constants.js';
import Paddle from './paddle.js';

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

const drawBoundaries = () => {
  r.DrawRectangle(0, 0, WINDOW.WIDTH, BOUNDARY.THICKNESS, BOUNDARY.COLOUR);
  r.DrawRectangle(0, WINDOW.HEIGHT - BOUNDARY.THICKNESS, WINDOW.WIDTH, BOUNDARY.THICKNESS, BOUNDARY.COLOUR);
};

const drawCourt = () => {
  drawBoundaries();
  r.DrawLine(WINDOW.WIDTH / 2, 0, WINDOW.WIDTH / 2, WINDOW.HEIGHT, BOUNDARY.COLOUR);
}

const drawGameState = (paddleY) => {
  r.DrawCircle(WINDOW.WIDTH / 2, WINDOW.HEIGHT / 2, BALL.RADIUS, BALL.COLOUR);
  drawPaddles(paddleY);
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
  const playerPaddle = new Paddle(paddleLimits, initialPaddlePosition);

  while (!r.WindowShouldClose()) {
    const currentPaddlePosition = handleKeyPress(playerPaddle);

    r.BeginDrawing();
    r.ClearBackground(WINDOW.BACKGROUND_COLOUR);

    drawCourt();
    drawGameState(currentPaddlePosition);

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
