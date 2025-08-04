import * as engine from "../engine/entry.ts";
import * as loop from "../engine/core/loop";
import { SceneFileParser } from "./SceneFileParser.ts";

export class CoreGame {

  mCamera: engine.Camera | null;
  mSceneFile: string;
  mSquares: engine.Renderable[];

  constructor() {
    this.mSceneFile = "assets/scene.xml";
    this.mSquares = [];
    this.mCamera = null;

  }

  init() {
    const sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile));

    this.mCamera = sceneParser.parseCamera();
    sceneParser.parseSquares(this.mSquares);
  }

  draw() {
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera!.setViewAndCameraMatrix();
    this.mSquares.forEach(square => square.draw(this.mCamera!));
  }

  update() {
    // Simple game: move the white square and pulse the red
    const whiteXform = this.mSquares[0].getTransform();
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

    const redXform = this.mSquares[1].getTransform();
    // Step C: test for pulsing the red square
    if (engine.input.isKeyPressed(engine.input.keys.down)) {
      if (redXform.getWidth() > 5) {
        redXform.setSize(2, 2);
      }
      redXform.increaseSizeBy(0.05);
    }
  }

  load() {
    engine.xml.load(this.mSceneFile);
  }

  unload() {
    engine.xml.unload(this.mSceneFile);
  }

}

window.onload = () => {
  engine.init("GLCanvas");
  const coreGame = new CoreGame();
  loop.start(coreGame);
};
