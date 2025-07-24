import * as engine from "../engine/entry.ts";
import { Matrix4 } from "../matrix/Matrix4.ts"

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

    const trsMat = new Matrix4()

    trsMat.translate([-0.25, 0.25, 0.0]);
    trsMat.rotateZ(0.2);
    trsMat.scale([1.2, 1.2, 1.0]);
    mWhiteSq.draw(trsMat.get());

    trsMat.identiy();
    trsMat.translate([0.25, -0.25, 0.0]);
    trsMat.rotateZ(-0.785);
    trsMat.scale([0.4, 0.4, 1.0]);
    mRedSq.draw(trsMat.get());
  }
}

window.onload = () => {
  new CoreGame("GLCanvas");
};
