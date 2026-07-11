import r from 'raylib';
import { WINDOW, BALL, BOUNDARY, PADDLE } from './constants.js';

const drawPaddles = (paddleOffsetY) => {
  r.DrawRectangle(
    PADDLE.OFFSET,
    WINDOW.HEIGHT / 2 - PADDLE.HEIGHT / 2 + paddleOffsetY,
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

const drawBoundaries = () => {
  r.DrawRectangle(0, 0, WINDOW.WIDTH, BOUNDARY.THICKNESS, BOUNDARY.COLOUR);
  r.DrawRectangle(0, WINDOW.HEIGHT - BOUNDARY.THICKNESS, WINDOW.WIDTH, BOUNDARY.THICKNESS, BOUNDARY.COLOUR);
};

const drawCourt = () => {
  drawBoundaries();
  r.DrawLine(WINDOW.WIDTH / 2, 0, WINDOW.WIDTH / 2, WINDOW.HEIGHT, BOUNDARY.COLOUR);
}

const drawGameState = (paddleOffsetY) => {
  r.DrawCircle(WINDOW.WIDTH / 2, WINDOW.HEIGHT / 2, BALL.RADIUS, BALL.COLOUR);
  drawPaddles(paddleOffsetY);
}

const handleKeyPress = (paddleOffsetY) => {
  if (r.IsKeyDown(PADDLE.DOWN)) {
    paddleOffsetY += 1;
  }
  if (r.IsKeyDown(PADDLE.UP)) {
    paddleOffsetY -= 1;
  }
  return paddleOffsetY;
}

const main = () => {
  r.InitWindow(WINDOW.WIDTH, WINDOW.HEIGHT, 'Pong game');
  r.SetTargetFPS(WINDOW.FPS);
  let paddleOffsetY = 0;

  while (!r.WindowShouldClose()) {
    paddleOffsetY = handleKeyPress(paddleOffsetY);

    r.BeginDrawing();
    r.ClearBackground(WINDOW.BACKGROUND_COLOUR);

    drawCourt();
    drawGameState(paddleOffsetY);

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
