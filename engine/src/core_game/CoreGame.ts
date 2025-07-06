import * as engine from "../engine/entry.ts";

class CoreGame {
  constructor(htmlCanvasId: string) {
    this.runShaders(htmlCanvasId);
  }

  async runShaders(htmlCanvasId: string) {
    await engine.init(htmlCanvasId);

    const mWhiteSq = new engine.Renderable();
    mWhiteSq.setColor([1.0, 1.0, 1.0, 1.0]);
    const mRedSq = new engine.Renderable();
    mRedSq.setColor([1.0, 0.0, 0.0, 1.0]);

    engine.clearCanvas([0.0, 8.0, 0.0, 1.0]);

    mWhiteSq.draw();
    mRedSq.draw();
  }
}

window.onload = () => {
  new CoreGame("GLCanvas");
};
