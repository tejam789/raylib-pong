export default class Ball {
  #ballPosition;
  #ballVelocity;
  #initialBallPosition;
  #initialBallVelocity;
  #boundaries;

  constructor(boundaries, initialBallPosition, initialBallVelocity) {
    this.#boundaries = boundaries;
    this.#initialBallPosition = initialBallPosition;
    this.#initialBallVelocity = initialBallVelocity;
    this.#ballPosition = { ...initialBallPosition };
    this.#ballVelocity = { ...initialBallVelocity };
  }

  get position() {
    return this.#ballPosition;
  }

  move(paddlePosition, paddleConfig) {
    this.#ballPosition.x += this.#ballVelocity.x;
    this.#ballPosition.y += this.#ballVelocity.y;

    if (this.#ballPosition.y <= this.#boundaries.y.min || this.#ballPosition.y >= this.#boundaries.y.max) {
      this.#ballVelocity.y *= -1;
    }
    if(this.#isCollidingWithPaddle(paddlePosition, paddleConfig)) {
      this.#ballVelocity.x *= -1;
    }
    return this.#ballPosition;
  }

  isBeforeX(x) {
    return this.#ballPosition.x <= x;
  }

  isAfterX(x) {
    return this.#ballPosition.x >= x;
  }

  reset() {
    this.#ballPosition = { ...this.#initialBallPosition };
    this.#ballVelocity = { ...this.#initialBallVelocity };
  }

  #isWithInPaddleHeight(paddlePosition, paddleConfig) {
    const paddleTop = paddlePosition;
    const paddleBottom = paddlePosition + paddleConfig.HEIGHT;
    return this.#ballPosition.y >= paddleTop && this.#ballPosition.y <= paddleBottom;
  }

  #isOnPaddleface(paddleConfig) {
    return this.#ballPosition.x === paddleConfig.WIDTH + paddleConfig.OFFSET;
  }

  #isCollidingWithPaddle(paddlePosition, paddleConfig) {
    return this.#isOnPaddleface(paddleConfig) && this.#isWithInPaddleHeight(paddlePosition, paddleConfig);
  }
}