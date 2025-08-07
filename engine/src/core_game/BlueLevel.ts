import * as engine from "../engine/entry.ts";
import { CoreGame } from "./CoreGame.ts";
import { SceneFileParser } from "./util/SceneFileParser.ts";

export class BlueLevel extends engine.Scene {
  mSceneFile: string;
  mSquares: engine.Renderable[];
  mCamera: null | engine.Camera;
  mBackgroundAudio: string;
  mCue: string;
  kPortal: string;
  kCollector: string;

  constructor() {
    super();
    this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
    this.mCue = "assets/sounds/my_game_cue.wav";

    this.mSceneFile = "assets/scene.xml";

    this.kPortal = "assets/images/minion_portal.jpg";
    this.kCollector = "assets/images/minion_collector.jpg";

    this.mSquares = [];
    this.mCamera = null;
  }

  init() {
    const sceneParser = new SceneFileParser(engine.xml.get(this.mSceneFile));
    this.mCamera = sceneParser.parseCamera();

    sceneParser.parseSquares(this.mSquares);
    sceneParser.parseTextureSquares(this.mSquares);

    engine.audio.playBackground(this.mBackgroundAudio, 1.0);
  }

  draw() {
    this.mCamera!.setViewAndCameraMatrix();
    this.mSquares.forEach((square) => {
      square.draw(this.mCamera!);
    });
  }

  load() {
    engine.xml.load(this.mSceneFile);

    engine.audio.load(this.mBackgroundAudio);
    engine.audio.load(this.mCue);

    engine.texture.load(this.kPortal);
    engine.texture.load(this.kCollector);
  }

  unload() {
    engine.audio.stopBackground();

    engine.xml.unload(this.mSceneFile);

    engine.audio.unload(this.mBackgroundAudio);
    engine.audio.unload(this.mCue);

    engine.texture.unload(this.kPortal);
    engine.texture.unload(this.kCollector);
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
      engine.audio.playCue(this.mCue, 0.5);
      if (squareTransform!.getXPosition() > 30) {
        // right-bound of the window
        squareTransform!.setPosition(12, 60);
      }
      squareTransform!.increaseXPositionBy(deltaX);
    }
    // Step B: test for white square rotation
    if (engine.input.isKeyPressed(engine.input.keys.left)) {
      engine.audio.playCue(this.mCue, 1.5);
      squareTransform!.increaseXPositionBy(-deltaX);
      if (squareTransform!.getXPosition() < 11) {
        this.next();
      }
    }

    if (engine.input.isKeyPressed(engine.input.keys.Q)) this.stop();

    //temp changing collors on texture tinging
    const c = this.mSquares[1].getColor();
    let ca = c[3] + deltaX;
    if (ca > 1) {
      ca = 0;
    }

    c[3] = ca;
  }
}
