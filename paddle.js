export default class Paddle {
  #paddleLimits;
  #paddlePosition;

  constructor(paddleLimits, initialPaddlePosition) {
    this.#paddleLimits = paddleLimits;
    this.#paddlePosition = initialPaddlePosition;
  }

  moveUp() {
    if(this.#paddlePosition > this.#paddleLimits.top) {
      this.#paddlePosition -= 1;
    }

    return this.#paddlePosition;
  }
  
  moveDown() {
    if(this.#paddlePosition < this.#paddleLimits.bottom) {
      this.#paddlePosition += 1;
    }

    return this.#paddlePosition;
  }

  get position() {
    return this.#paddlePosition;
  }
}