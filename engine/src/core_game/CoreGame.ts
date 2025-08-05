import * as engine from "../engine/entry.ts";
import { BlueLevel } from "./BlueLevel.ts";

export class CoreGame extends engine.Scene {
  mCamera: engine.Camera | null;
  mHero: null | engine.Renderable;
  mSupport: null | engine.Renderable;
  mBackgroundAudio: string;
  mCue: string;

  constructor() {
    super();
    this.mBackgroundAudio = "assets/sounds/bg_clip.mp3";
    this.mCue = "assets/sounds/my_game_cue.wav";

    this.mCamera = null;

    this.mHero = null;
    this.mSupport = null;
  }

  init() {
    this.mCamera = new engine.Camera([20, 60], 20, [20, 40, 600, 300]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

    this.mSupport = new engine.Renderable();
    this.mSupport.setColor([0.8, 0.2, 0.2, 1.0]);
    this.mSupport.getTransform().setPosition(20, 60).setSize(5, 5);

    this.mHero = new engine.Renderable();
    this.mHero.setColor([0.0, 0.0, 1.0, 1.0]);
    this.mHero.getTransform().setPosition(20, 60).setSize(2, 3);

    engine.audio.playBackground(this.mBackgroundAudio, 1.0);
  }

  draw() {
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera!.setViewAndCameraMatrix();
    this.mSupport!.draw(this.mCamera!);
    this.mHero!.draw(this.mCamera!);
  }

  load() {
    engine.audio.load(this.mBackgroundAudio);
    engine.audio.load(this.mCue);
  }

  unload() {
    engine.audio.stopBackground();
    engine.audio.unload(this.mBackgroundAudio);
    engine.audio.unload(this.mCue);
  }

  update() {
    // Simple game: move the white square and pulse the red
    const deltaX = 0.05;
    const heroTransform = this.mHero?.getTransform();

    // Step A: test for white square movement
    if (engine.input.isKeyPressed(engine.input.keys.right)) {
      engine.audio.playCue(this.mCue, 0.5);
      engine.audio.changeBackgroundVolume();
      if (heroTransform!.getXPosition() > 30) {
        // right-bound of the window
        heroTransform!.setPosition(12, 60);
      }
      heroTransform!.increaseXPositionBy(deltaX);
    }
    // Step B: test for white square rotation
    if (engine.input.isKeyPressed(engine.input.keys.left)) {
      engine.audio.playCue(this.mCue, 1.5);
      engine.audio.changeBackgroundVolume(-0.05);
      heroTransform!.increaseXPositionBy(-deltaX);
      if (heroTransform!.getXPosition() < 11) {
        this.next();
      }
    }

    if (engine.input.isKeyPressed(engine.input.keys.Q)) this.stop();
  }

  next() {
    super.next();

    const nextLevel = new BlueLevel();
    nextLevel.start();
  }
}

window.onload = () => {
  engine.init("GLCanvas");
  const coreGame = new CoreGame();
  coreGame.start();
};
