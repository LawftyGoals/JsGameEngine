import * as engine from "../engine/entry.ts";

class CoreGame {
  constructor(htmlCanvasId: string) {
    this.runShaders(htmlCanvasId);
  }

  async runShaders(htmlCanvasId: string) {
    await engine.init(htmlCanvasId);

    const mCamera = new engine.Camera([20, 60], 20, [20, 40, 600, 300]);

    const mBlueSq = new engine.Renderable();
    mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
    const mRedSq = new engine.Renderable();
    mRedSq.setColor([1, 0.25, 0.25, 1]);
    const mTLSq = new engine.Renderable();
    mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    const mTRSq = new engine.Renderable();
    mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    const mBRSq = new engine.Renderable();
    mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    const mBLSq = new engine.Renderable();
    mBLSq.setColor([0.1, 0.1, 0.1, 1]);

    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    mCamera.setViewAndCameraMatrix();



    mBlueSq.getTransform().setPosition(20, 60)
      .setRotationInRadians(0.2)
      .setSize(5, 5);
    mBlueSq.draw(mCamera);


    mRedSq.getTransform().setPosition(20, 60).setSize(2, 2);
    mRedSq.draw(mCamera);

    // top left
    mTLSq.getTransform().setPosition(10, 65);
    mTLSq.draw(mCamera);
    mTRSq.getTransform().setPosition(30, 65);
    mTRSq.draw(mCamera);
    mBRSq.getTransform().setPosition(30, 55);
    mBRSq.draw(mCamera);
    mBLSq.getTransform().setPosition(10, 55);
    mBLSq.draw(mCamera);



  }
}

window.onload = () => {
  new CoreGame("GLCanvas");
};
