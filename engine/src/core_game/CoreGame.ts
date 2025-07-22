import * as engine from "../engine/entry.ts";
import * as mat4 from "../matrix/mat4.ts"

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
    let trsMatrix = [1, 1, 1];
    mat4.simpleTranslate(trsMatrix, [-0.1, -0.5, -0.1]);
    console.log(trsMatrix);
    let trsMatrix2 = mat4.simpleTranslate([1, 1, 1], [-0.5, 0.1, 0.1]);

    mWhiteSq.draw(trsMatrix);
    mRedSq.draw(trsMatrix2);
  }
}

window.onload = () => {
  new CoreGame("GLCanvas");
};
