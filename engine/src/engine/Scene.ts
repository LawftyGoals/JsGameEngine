import * as loop from "./core/loop";
import * as engine from "./entry";

const kAbstractClassError = new Error("Abstract Class");
const kAbstractMethodError = new Error("Abstract Method");

export class Scene {
  constructor() {
    if (this.constructor === Scene) {
      throw kAbstractClassError;
    }
  }

  async start() {
    await loop.start(this);
  }

  next() {
    loop.stop();
    this.unload();
  }

  stop() {
    loop.stop();
    this.unload();
    engine.cleanUp();
  }

  init() {}
  load() {}
  unload() {}
  draw() {}
  update() {}
}
