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

    mWhiteSq.getTransform().setPosition(-0.25, 0.25).setRotationInRadians(0.2).setSize(1.2, 1.2);
    mWhiteSq.draw();

    mRedSq.getTransform().setXPosition(0.25).setYPosition(-0.25).setRotationInDegree(45).setWidth(0.4).setHeight(0.4);
    mRedSq.draw();
  }
}

window.onload = () => {
  new CoreGame("GLCanvas");
};
