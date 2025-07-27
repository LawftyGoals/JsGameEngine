import * as sysGL from "../engine/core/sysGL.ts"
import * as engine from "../engine/entry.ts";
import { Matrix4 } from "../matrix/Matrix4.ts";

class CoreGame {
  constructor(htmlCanvasId: string) {
    this.runShaders(htmlCanvasId);
  }

  async runShaders(htmlCanvasId: string) {
    await engine.init(htmlCanvasId);

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

    const gl = sysGL.get()!;
    gl.viewport(20, 40, 600, 300);
    gl.scissor(20, 40, 600, 300);
    gl.enable(gl.SCISSOR_TEST);
    engine.clearCanvas([0.8, 0.8, 0.8, 1.0]);
    gl.disable(gl.SCISSOR_TEST);

    const vCameraCenter = [20, 60];
    const vWcSize = [20, 10];
    const cameraMatrix = new Matrix4();

    cameraMatrix.scale([2.0 / vWcSize[0], 2.0 / vWcSize[1], 1.0])
      .translate([-vCameraCenter[0], -vCameraCenter[1], 0]);

    mBlueSq.getTransform().setPosition(20, 60)
      .setRotationInRadians(0.2)
      .setSize(5, 5);
    mBlueSq.draw(cameraMatrix.get());


    mRedSq.getTransform().setPosition(20, 60).setSize(2, 2);
    mRedSq.draw(cameraMatrix.get());

    // top left
    mTLSq.getTransform().setPosition(10, 65);
    mTLSq.draw(cameraMatrix.get());
    mTRSq.getTransform().setPosition(30, 65);
    mTRSq.draw(cameraMatrix.get());
    mBRSq.getTransform().setPosition(30, 55);
    mBRSq.draw(cameraMatrix.get());
    mBLSq.getTransform().setPosition(10, 55);
    mBLSq.draw(cameraMatrix.get());



  }
}

window.onload = () => {
  new CoreGame("GLCanvas");
};
