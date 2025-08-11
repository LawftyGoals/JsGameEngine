import { TextureShader } from "./TextureShader";
import * as sysGL from "../core/sysGL"
import type { TVector8 } from "../../matrix/VectorTypes";

export class SpriteShader extends TextureShader {
    mTextureCoordinateBuffer: WebGLBuffer;
    constructor(vertexShaderPath: string, fragmentShaderPath: string) {
        super(vertexShaderPath, fragmentShaderPath);

        const initTextureCoordinate = [
            1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0
        ];

        const gl = sysGL.get();

        this.mTextureCoordinateBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTextureCoordinateBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTextureCoordinate), gl.DYNAMIC_DRAW);
    }

    setTextureCoordinate(textureCoordinates: TVector8) {
        const gl = sysGL.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTextureCoordinateBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(textureCoordinates));
    }

    _getTextureCoordinateBuffer(): WebGLBuffer {
        return this.mTextureCoordinateBuffer;
    }

    cleanUp() {
        const gl = sysGL.get();
        gl.deleteBuffer(this.mTextureCoordinateBuffer);

        super.cleanUp();
    }
}