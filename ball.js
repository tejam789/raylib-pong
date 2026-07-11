export default class Ball {
  #ballPosition;
  #ballVelocity;
  #boundaries;

  constructor(boundaries, initialBallPosition, initialBallVelocity) {
    this.#boundaries = boundaries;
    this.#ballPosition = initialBallPosition;
    this.#ballVelocity = initialBallVelocity;
  }

  get position() {
    return this.#ballPosition;
  }

  move() {
    this.#ballPosition.x += this.#ballVelocity.x;
    this.#ballPosition.y += this.#ballVelocity.y;
  }
}