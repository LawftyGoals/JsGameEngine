import * as engine from "../engine/core.js";

class CoreGame {
  constructor(htmlCanvasId: string) {
    this.runShaders(htmlCanvasId);
  }

  async runShaders(htmlCanvasId: string) {
    await engine.init(htmlCanvasId);
    engine.clearCanvas([0.0, 0.8, 0.0, 1.0]);
    engine.drawSquare([1, 0, 0, 1]);
  }
}

window.onload = () => {
  new CoreGame("GLCanvas");
};
