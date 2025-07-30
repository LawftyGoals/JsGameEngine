"use strict";

import type { CoreGame } from "../../core_game/CoreGame";
import * as resourceMap from "./resourceMap";

const kUPS = 60;
const kMPF = 1000 / kUPS;

let mPrevTime = 0;
let mLagTime = 0;

let mLoopRunning = false;
let mCurrentScene: CoreGame | null = null;
let mFrameId = -1;

function loopOnce() {
    if (mLoopRunning) {
        mFrameId = requestAnimationFrame(loopOnce);
        mCurrentScene!.draw();

        let currentTime = performance.now();
        let elapsedTime = currentTime - mPrevTime;
        mPrevTime = currentTime;
        mLagTime += elapsedTime;

        while ((mLagTime >= kMPF) && mLoopRunning) {
            mCurrentScene!.update();
            mLagTime -= kMPF;
        }
    }
}

export async function start(scene: CoreGame) {
    if (mLoopRunning) {
        throw new Error("loop already running");
    }

    await resourceMap.waitOnPromises();

    mCurrentScene = scene;
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

