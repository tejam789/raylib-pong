import r from 'raylib';
import { WINDOW, BALL, WALL, PADDLE } from './constants.js';
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
  const paddleMinY = WALL.THICKNESS;
  const paddleMaxY = WINDOW.HEIGHT - WALL.THICKNESS - PADDLE.HEIGHT;
  const initialPaddlePosition = (paddleMinY + paddleMaxY) / 2;

  return {
    paddleLimits: { top: paddleMinY, bottom: paddleMaxY },
    initialPaddlePosition,
  };
}

const getBallConfig = () => {
  const ballPosition = { x: WINDOW.WIDTH / 2, y: WINDOW.HEIGHT / 2 };
  const ballVelocity = { x: -2, y: 1 };
  const edge = BALL.RADIUS + WALL.THICKNESS;
  const ballLimits = {
    x: { min: BALL.RADIUS, max: WINDOW.WIDTH - BALL.RADIUS },
    y: { min: edge, max: WINDOW.HEIGHT - edge },
  };

  return { ballPosition, ballVelocity, ballLimits };
}

const drawScores = (playerScore, botScore) => {
  r.DrawText(`Player: ${playerScore}`, 20, 20, 20, r.DARKBLUE);
  r.DrawText(`Bot: ${botScore}`, WINDOW.WIDTH - 100, 20, 20, r.DARKBLUE);
}

const drawWalls = () => {
  r.DrawRectangle(0, 0, WINDOW.WIDTH, WALL.THICKNESS, WALL.COLOUR);
  r.DrawRectangle(0, WINDOW.HEIGHT - WALL.THICKNESS, WINDOW.WIDTH, WALL.THICKNESS, WALL.COLOUR);
};

const drawCourt = () => {
  drawWalls();
  r.DrawLine(WINDOW.WIDTH / 2, 0, WINDOW.WIDTH / 2, WINDOW.HEIGHT, WALL.COLOUR);
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

const play = () => {
  const {paddleLimits, initialPaddlePosition} = getPaddleConfig();
  const {ballPosition, ballVelocity, ballLimits} = getBallConfig();
  const playerPaddle = new Paddle(paddleLimits, initialPaddlePosition);
  const ball = new Ball(ballLimits, ballPosition, ballVelocity);
  
  let playerScore = 0;
  let botScore = 0;
  
  while (!r.WindowShouldClose()) {
    const currentPaddlePosition = handleKeyPress(playerPaddle);
    ball.move(currentPaddlePosition, PADDLE);
    
    r.BeginDrawing();
    r.ClearBackground(WINDOW.BACKGROUND_COLOUR);
    
    drawCourt();
    drawPaddles(currentPaddlePosition);
    drawBall(ball.position);
    
    if(ball.isBeforeX(BALL.RADIUS)) {
      botScore++;
      ball.reset();
    }
    if(ball.isAfterX(WINDOW.WIDTH - BALL.RADIUS)) {
      playerScore++;
      ball.reset();
    }
    
    drawScores(playerScore, botScore);
    r.EndDrawing();
  }
  
  r.CloseWindow();
}

const startGame = () => {
  
  while (!r.WindowShouldClose() && !r.IsKeyDown(65)) {
    r.BeginDrawing();
    r.ClearBackground(WINDOW.BACKGROUND_COLOUR);
    r.DrawText('Press A to start', WINDOW.WIDTH / 2 - 100, WINDOW.HEIGHT / 2, 20, r.DARKBLUE);
    r.EndDrawing();
    // Wait for user input
  }
  
  if (r.WindowShouldClose()) {
    r.CloseWindow();
    return;
  }
  play();
}

const main = () => {
  r.InitWindow(WINDOW.WIDTH, WINDOW.HEIGHT, 'Pong game');
  r.SetTargetFPS(WINDOW.FPS);
  startGame();
};

main();
