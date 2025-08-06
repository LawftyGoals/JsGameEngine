import { get, has, loadDecodeParse, pushPromise, unload, set } from "../core/resourceMap";
import * as sysGL from "../core/sysGL";

export { has, loadDecodeParse };

export class TextureInfo {
    mWidth: number;
    mHeight: number;
    mGLTextureID: WebGLTexture;
    constructor(width: number, height: number, id: WebGLTexture) {
        this.mWidth = width;
        this.mHeight = height;
        this.mGLTextureID = id;
    }
}

export function load(texturePath: string) {
    const image = new Image();

    const texturePromise = new Promise(function (resolve) {
        image.onload = resolve;
        image.src = texturePath;
    }).then(
        function resolve() {
            processLoadedImage(texturePath, image);
        }
    );

    pushPromise(texturePromise);

    return texturePromise;

}

export function textureUnload(texturePath: string) {
    const textureInfo = get(texturePath);

    if (unload(texturePath)) {
        const gl = sysGL.get();
        gl.deleteTexture(textureInfo.mGLTextureID);
    }
}

function processLoadedImage(path: string, image: HTMLImageElement) {
    const gl = sysGL.get();

    const textureID = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, textureID);

    // Loads texture to texture data structure with descriptive info.
    // Parameters:
    // 1: "binding point" or target the texture is being loaded to.
    // 2: Level of detail. Used for mipmapping. 0 is base texture level.
    // 3: Internal format. The composition of each element. i.e. pixels.
    // 4: Format of texel data. Must match internal format.
    // 5: The data type of the texel data.
    // 6: Texture Data.

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);

    const textureInfo = new TextureInfo(image.naturalWidth, image.naturalHeight, textureID);

    set(path, textureInfo);

}

export function activate(textureName: string, sharp: boolean = false) {
    const gl = sysGL.get();
    const textureInfo = get(textureName);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureInfo.mGL.textureID);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    if (sharp) {
        //for textures to look sharp.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }

    //for textures to look sharp.
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}

export function deactivate() {
    const gl = sysGL.get();
    gl.bindTexture(gl.TEXTURE_2D, null);
}