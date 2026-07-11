const r = require('raylib');

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 450;
const FPS = 60;
const BACKGROUND_COLOUR = r.RAYWHITE;

const BALL_COLOUR = r.RED;
const BALL_RADIUS = 5;

const BOUNDARY_COLOUR = r.DARKGRAY;
const BOUNDARY_THICKNESS = 20;

const PADDLE_COLOUR = r.DARKBLUE;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;
const PADDLE_OFFSET = 10;
const PADDLE_DOWN = r.KEY_DOWN;
const PADDLE_UP = r.KEY_UP;

const drawPaddles = (paddleOffsetY) => {
  r.DrawRectangle(
    PADDLE_OFFSET,
    WINDOW_HEIGHT / 2 - PADDLE_HEIGHT / 2 + paddleOffsetY,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_COLOUR
  );

  r.DrawRectangle(
    WINDOW_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH,
    WINDOW_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_COLOUR
  );
}

const drawBoundaries = () => {
  r.DrawRectangle(0, 0, WINDOW_WIDTH, BOUNDARY_THICKNESS, BOUNDARY_COLOUR);
  r.DrawRectangle(0, WINDOW_HEIGHT - BOUNDARY_THICKNESS, WINDOW_WIDTH, BOUNDARY_THICKNESS, BOUNDARY_COLOUR);
};

const drawCourt = () => {
  drawBoundaries();
  r.DrawLine(WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 2, WINDOW_HEIGHT, BOUNDARY_COLOUR);
}

const drawGameState = (paddleOffsetY) => {
  r.DrawCircle(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, BALL_RADIUS, BALL_COLOUR);
  drawPaddles(paddleOffsetY);
}

const handleKeyPress = (paddleOffsetY) => {
  if (r.IsKeyDown(PADDLE_DOWN)) {
    paddleOffsetY += 1;
  }
  if (r.IsKeyDown(PADDLE_UP)) {
    paddleOffsetY -= 1;
  }
  return paddleOffsetY;
}

const main = () => {
  r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, 'Pong game');
  r.SetTargetFPS(FPS);
  let paddleOffsetY = 0;

  while (!r.WindowShouldClose()) {
    paddleOffsetY = handleKeyPress(paddleOffsetY);

    r.BeginDrawing();
    r.ClearBackground(BACKGROUND_COLOUR);

    drawCourt();
    drawGameState(paddleOffsetY);

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
