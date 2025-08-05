"use strict";

const mKeyPreviousState = new Map<string, boolean>();
const mIsKeyPressed = new Map<string, boolean>();
const mIsKeyClicked = new Map<string, boolean>();

const onKeyDown = (keyboardEvent: KeyboardEvent) => {
  mIsKeyPressed.set(keyboardEvent.code, true);
};

const onKeyUp = (keyboardEvent: KeyboardEvent) => {
  mIsKeyPressed.set(keyboardEvent.code, false);
};

export function isKeyPressed(keyCode: string) {
  return mIsKeyPressed.get(keyCode);
}

export function isKeyClicked(keyCode: string) {
  return mIsKeyClicked.get(keyCode);
}

export function init() {
  for (let [key, _value] of mIsKeyPressed) {
    mIsKeyPressed.set(key, false);
    mKeyPreviousState.set(key, false);
    mIsKeyClicked.set(key, false);
  }

  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("keydown", onKeyDown);
}

export function update() {
  for (let [key, _value] of mIsKeyPressed) {
    mIsKeyClicked.set(
      key,
      Boolean(!mKeyPreviousState.get(key) && mIsKeyPressed.get(key))
    );

    mKeyPreviousState.set(key, Boolean(mIsKeyPressed.get(key)));
  }
}

export function cleanUp() {}

export const keys = {
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",

  space: "Space",

  zero: "Digit0",
  one: "Digit1",
  two: "Digit2",
  three: "Digit3",
  four: "Digit4",
  five: "Digit5",
  six: "Digit6",
  seven: "Digit7",
  eight: "Digit8",
  nine: "Digit9",

  A: "KeyA",
  D: "KeyD",
  E: "KeyE",
  F: "KeyF",
  G: "KeyG",
  I: "KeyI",
  J: "KeyJ",
  K: "KeyK",
  L: "KeyL",
  Q: "KeyQ",
  R: "KeyR",
  S: "KeyS",
  W: "KeyW",
};
