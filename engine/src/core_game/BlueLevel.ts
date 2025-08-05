import * as engine from "../engine/entry.ts";
import { CoreGame } from "./CoreGame.ts";
import { SceneFileParser } from "./util/SceneFileParser.ts";

export class BlueLevel extends engine.Scene {
  mSceneFile: string;
  mSquares: engine.Renderable[];
  mCamera: null | engine.Camera;

  constructor() {
    super();
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
    this.mCamera!.setViewAndCameraMatrix();
    this.mSquares.forEach((square) => {
      square.draw(this.mCamera!);
    });
  }

  load() {
    engine.xml.load(this.mSceneFile);
  }

  unload() {
    engine.xml.unload(this.mSceneFile);
  }

  next() {
    super.next();
    new CoreGame().start();
  }

  update() {
    // Simple game: move the white square and pulse the red
    const deltaX = 0.05;
    const squareTransform = this.mSquares[1]!.getTransform();

    // Step A: test for white square movement
    if (engine.input.isKeyPressed(engine.input.keys.right)) {
      if (squareTransform!.getXPosition() > 30) {
        // right-bound of the window
        squareTransform!.setPosition(12, 60);
      }
      squareTransform!.increaseXPositionBy(deltaX);
    }
    // Step B: test for white square rotation
    if (engine.input.isKeyPressed(engine.input.keys.left)) {
      squareTransform!.increaseXPositionBy(-deltaX);
      if (squareTransform!.getXPosition() < 11) {
        this.next();
      }
    }

    if (engine.input.isKeyPressed(engine.input.keys.Q)) this.stop();
  }
}
