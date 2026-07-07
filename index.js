const r = require('raylib');

function main() {
  r.InitWindow(800, 450, 'raylib [core] example - basic window');
  r.SetTargetFPS(60)

  while (!r.WindowShouldClose()) {
    // Game loop code here
    r.BeginDrawing();

    r.ClearBackground(r.RAYWHITE);
    r.DrawText('Welcome to pong', 10, 20, 20, r.LIGHTGRAY);

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();