"use strict";

import { get, has, unload, loadDecodeParse } from "../core/resourceMap";

let mAudioContext: null | AudioContext = null;
let mBackgroundAudio: null | AudioBufferSourceNode = null;
let mBackgroundGain: null | GainNode = null;
let mCueGain = null;
let mMasterGain: null | GainNode = null;
const kDefaultInitGain = 0.1;

function decodeResource(data: Response) {
  return data.arrayBuffer();
}
function parseResource(data: ArrayBuffer) {
  return mAudioContext!.decodeAudioData(data);
}

export function load(path: string) {
  return loadDecodeParse(path, decodeResource, parseResource);
}

export function init() {
  try {
    //@ts-ignore
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    mAudioContext = new AudioContext();

    mMasterGain = mAudioContext.createGain();
    mMasterGain.connect(mAudioContext.destination);

    mMasterGain.gain.value = kDefaultInitGain;

    mBackgroundGain = mAudioContext.createGain();
    mBackgroundGain.connect(mMasterGain);

    mBackgroundGain.gain.value = 1.0;

    mCueGain = mAudioContext.createGain();
    mCueGain.connect(mMasterGain);

    mCueGain.gain.value = 1.0;
  } catch (e) {
    throw new Error("AudioContext failed " + e);
  }
}

export function playCue(path: string, volume: number) {
  const source = mAudioContext!.createBufferSource();
  source.buffer = get(path);
  source.start(0);
  source.connect(mCueGain!);
  mCueGain!.gain.value = volume;
}

export function playBackground(path: string, volume: number) {
  if (has(path)) {
    stopBackground();
    mBackgroundAudio = mAudioContext!.createBufferSource();
    mBackgroundAudio.buffer = get(path);
    mBackgroundAudio.loop = true;
    mBackgroundAudio.start(0);
    mBackgroundAudio.connect(mBackgroundGain!);
    setBackgroundVolume(volume);
  }
}

export function stopBackground() {
  if (mBackgroundAudio) {
    mBackgroundAudio.stop(0);
    mBackgroundAudio = null;
  }
}

export function isBackgroundPlaying() {
  return Boolean(mBackgroundAudio);
}

export function setBackgroundVolume(volume: number) {
  if (mBackgroundGain) {
    mBackgroundGain.gain.value = volume;
  }
}

export function changeBackgroundVolume(change: number = 0.05) {
  if (mBackgroundGain) {
    mBackgroundGain.gain.value += change;

    if (mBackgroundGain.gain.value < 0) {
      setBackgroundVolume(0);
    }
  }
}

export function setMasterVolume(volume: number) {
  if (mMasterGain) {
    mMasterGain.gain.value = volume;
  }
}

export function changeMasterVolume(change: number = 0.05) {
  if (mMasterGain) {
    mMasterGain.gain.value += change;

    if (mMasterGain.gain.value < 0) {
      setMasterVolume(0);
    }
  }
}

export function cleanUp() {
  mAudioContext?.close();
  mAudioContext = null;
}

export { unload };
