"use strict";

import { SimpleShader } from "../SimpleShader.ts";
import { text } from "../entry.ts";
import * as resourceMap from "./resourceMap.ts"

const kSimpleVS = "/src/shaders/SimpleVertexShader.glsl";
const kSimpleFS = "/src/shaders/SimpleFragmentShader.glsl";
let mConstColorShader: SimpleShader | null = null;

async function createShaders() {
  mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
}

export function init() {
  const loadPromise = new Promise<void>(
    async function (resolve) {
      await Promise.all([text.load(kSimpleFS), text.load(kSimpleVS)]);
      resolve();
    }
  ).then(function resolve() { createShaders(); });

  resourceMap.pushPromise(loadPromise)
}

export function getConstColorShader() {
  return mConstColorShader;
}
