import * as core from "./core.js";
import * as vertexBuffer from "./core/vertexBuffer.js";

export class SimpleShader {
  mVertexShader: null | WebGLShader;
  mFragmentShader: null | WebGLShader;
  mCompiledShader: null | WebGLProgram;
  mVertexPositionRef: null | GLint;
  constructor(vertexShaderId: string, fragmentShaderId: string) {
    this.mCompiledShader = null;
    this.mVertexPositionRef = null;

    const gl = core.getGL()!;
    this.mVertexShader = loadAndCompileShader(vertexShaderId, gl.VERTEX_SHADER);
    this.mFragmentShader = loadAndCompileShader(
      fragmentShaderId,
      gl.FRAGMENT_SHADER
    );

    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);
    gl.linkProgram(this.mCompiledShader);

    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
      throw Error("Error linking shader in SimpleShader class");
    }

    this.mVertexPositionRef = gl.getAttribLocation(
      this.mCompiledShader,
      "aVertexPosition"
    );
  }

  activate() {
    const gl = core.getGL()!;
    gl.useProgram(this.mCompiledShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
    gl.vertexAttribPointer(this.mVertexPositionRef!, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(this.mVertexPositionRef!);
  }
}

function loadAndCompileShader(id: string, shaderType: GLenum) {
  const gl = core.getGL()!;
  const shaderText = document.getElementById(id);

  const shaderSource = shaderText!.firstChild?.textContent!;
  const compiledShader = gl.createShader(shaderType)!;

  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw Error(
      "Error compiling shader in shaderSupport: " +
        gl.getShaderInfoLog(compiledShader)
    );
  }

  return compiledShader;
}
