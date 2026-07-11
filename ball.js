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

    if (this.#ballPosition.y <= this.#boundaries.y.min || this.#ballPosition.y >= this.#boundaries.y.max) {
      this.#ballVelocity.y *= -1;
    }

    return this.#ballPosition;
  }
}