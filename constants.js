import r from 'raylib';

const WINDOW = {
  WIDTH: 800,
  HEIGHT: 450,
  FPS: 60,
  BACKGROUND_COLOUR: r.RAYWHITE,
};

const BALL = {
  COLOUR: r.RED,
  RADIUS: 5,
};

const WALL = {
  COLOUR: r.DARKGRAY,
  THICKNESS: 20,
};

const PADDLE = {
  COLOUR: r.DARKBLUE,
  WIDTH: 10,
  HEIGHT: 50,
  OFFSET: 10,
  DOWN: r.KEY_DOWN,
  UP: r.KEY_UP,
};

export {
  WINDOW,
  BALL,
  WALL,
  PADDLE,
};
