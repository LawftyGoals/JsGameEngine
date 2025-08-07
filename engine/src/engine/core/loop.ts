"use strict";

import * as resourceMap from "./resourceMap";
import { input } from "../entry.ts";
import type { Scene } from "../Scene.ts";

const kUPS = 60;
const kMPF = 1000 / kUPS;

let mPrevTime = 0;
let mLagTime = 0;

let mLoopRunning = false;
let mCurrentScene: Scene | null = null;
let mFrameId = -1;

function loopOnce() {
  if (mLoopRunning) {
    mFrameId = requestAnimationFrame(loopOnce);
    mCurrentScene!.draw();

    let currentTime = performance.now();
    let elapsedTime = currentTime - mPrevTime;
    mPrevTime = currentTime;
    mLagTime += elapsedTime;

    while (mLagTime >= kMPF && mLoopRunning) {
      input.update();
      mCurrentScene!.update();
      mLagTime -= kMPF;
    }
  }
}

export async function start(scene: Scene) {
  if (mLoopRunning) {
    throw new Error("loop already running");
  }

  mCurrentScene = scene;

  mCurrentScene.load();

  await resourceMap.waitOnPromises();

  mCurrentScene!.init();
  mPrevTime = performance.now();
  mLagTime = 0.0;
  mLoopRunning = true;
  mFrameId = requestAnimationFrame(loopOnce);
}

export function stop() {
  mLoopRunning = false;
  cancelAnimationFrame(mFrameId);
}

export function cleanUp() {
  if (mLoopRunning) {
    stop();
  }
  mCurrentScene?.unload();
  mCurrentScene = null;
}
