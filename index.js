const r = require('raylib');

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 450;
const FPS = 60;

const BACKGROUND_COLOUR = r.RAYWHITE;
const BALL_COLOUR = r.RED;

const drawNewFrame = (x) => {
  r.DrawCircle(x, 10, 5, BALL_COLOUR);
}

function main() {
  r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, 'Pong');
  r.SetTargetFPS(FPS);
  let circleX = 10;

  while (!r.WindowShouldClose()) {
    // Game loop code here
    r.BeginDrawing();

    r.ClearBackground(BACKGROUND_COLOUR);
    drawNewFrame(circleX);
    circleX += 1;

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();