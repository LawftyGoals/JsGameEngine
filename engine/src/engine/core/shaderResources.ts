"use strict";

import { AsyncSimpleShader } from "../AsyncSimpleShader.js";

const kSimpleVS = "SimpleVertexShader";
const kSimpleFS = "SimpleFragmentShader";
let mConstColorShader: AsyncSimpleShader | null = null;

async function createShaders() {
  mConstColorShader = new AsyncSimpleShader();
  await mConstColorShader.runShaderProcess(kSimpleVS, kSimpleFS);
}

export async function init() {
  await createShaders();
}

export function getConstColorShader() {
  return mConstColorShader;
}
