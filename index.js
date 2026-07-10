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

const drawPaddles = () => {
  r.DrawRectangle(
    PADDLE_OFFSET,
    WINDOW_HEIGHT / 2 - PADDLE_HEIGHT / 2,
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

const drawGameWorld = () => {
  drawBoundaries();
  r.DrawCircle(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, BALL_RADIUS, BALL_COLOUR);
  r.DrawLine(WINDOW_WIDTH / 2, 0, WINDOW_WIDTH / 2, WINDOW_HEIGHT, BOUNDARY_COLOUR);
  drawPaddles();


}

const drawNewFrame = (x) => {
  r.DrawCircle(x, 10, BALL_RADIUS, BALL_COLOUR);
}

const main = () => {
  r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, 'Pong game');
  r.SetTargetFPS(FPS);
  let circleX = 10;

  while (!r.WindowShouldClose()) {
    // Game loop code here
    r.BeginDrawing();

    r.ClearBackground(BACKGROUND_COLOUR);
    drawGameWorld();
    drawNewFrame(circleX);
    circleX += 1;

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();