import * as engine from "../engine/entry.ts";
import * as loop from "../engine/core/loop";

export class CoreGame {

  mCamera: engine.Camera | null;
  mWhiteSq: engine.Renderable | null;
  mRedSq: engine.Renderable | null;

  constructor() {
    this.mCamera = null;

    this.mWhiteSq = null;
    this.mRedSq = null;

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
    // Simple game: move the white square and pulse the red
    const whiteXform = this.mWhiteSq!.getTransform();
    const deltaX = 0.05;
    // Step A: test for white square movement
    if (engine.input.isKeyPressed(engine.input.keys.right)) {
      if (whiteXform.getXPosition() > 30) { // right-bound of the window
        whiteXform.setPosition(10, 60);
      }
      whiteXform.increaseXPositionBy(deltaX);
    }
    // Step B: test for white square rotation
    if (engine.input.isKeyPressed(engine.input.keys.up)) {
      whiteXform.increaseRotationByDegrees(1);
    }

    const redXform = this.mRedSq!.getTransform();
    // Step C: test for pulsing the red square
    if (engine.input.isKeyPressed(engine.input.keys.down)) {
      if (redXform.getWidth() > 5) {
        redXform.setSize(2, 2);
      }
      redXform.increaseSizeBy(0.05);
    }
  }

}

window.onload = () => {
  engine.init("GLCanvas");
  const coreGame = new CoreGame();
  loop.start(coreGame);
};
