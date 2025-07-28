import * as engine from "../engine/entry.ts";
import * as loop from "../engine/core/loop";

class CoreGame {

  mCamera: engine.Camera | null;
  mWhiteSq: engine.Renderable | null;
  mRedSq: engine.Renderable | null;

  constructor(htmlCanvasId: string) {
    this.asyncRunEngine(htmlCanvasId);
    this.mCamera = null;

    this.mWhiteSq = null;
    this.mRedSq = null;

  }

  async asyncRunEngine(htmlCanvasId: string) {
    await engine.init(htmlCanvasId);

  }

  init() {
    this.mCamera = new engine.Camera([20, 60], 20, [20, 40, 600, 300]);

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

    this.mWhiteSq = new engine.Renderable();
    this.mWhiteSq.setColor([1.0, 1.0, 1.0, 1.0]);

    this.mRedSq = new engine.Renderable();
    this.mRedSq.setColor([1.0, 0.0, 0.0, 1.0]);

    this.mWhiteSq.getTransform().setPosition(20, 60).setRotationInRadians(0.2).setSize(5, 5);

    this.mRedSq.getTransform().setPosition(20, 60).setSize(2, 2);
  }

  draw() {
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera?.setViewAndCameraMatrix();
    this.mWhiteSq?.draw(this.mCamera!);
    this.mRedSq?.draw(this.mCamera!);
  }

  update() {
    const whiteTransform = this.mWhiteSq?.getTransform();
    const deltaTransform = 0.05;

    if (whiteTransform?.getXPosition()! > 30) {
      whiteTransform?.setPosition(10, 60);
    }

    whiteTransform?.increaseXPositionBy(deltaTransform);
    whiteTransform?.increaseRotationByDegrees(1);

    const redTransform = this.mRedSq?.getTransform();
    if (redTransform!.getWidth() > 5) {
      redTransform?.setSize(2, 2);
    }

    redTransform?.increaseSizeBy(deltaTransform);
  }

}

window.onload = () => {
  const coreGame = new CoreGame("GLCanvas");
  loop.start(coreGame);
};
