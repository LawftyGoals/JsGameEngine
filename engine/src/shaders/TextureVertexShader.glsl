attribute vec3 aVertexPosition;
attribute vec2 aTextureCoordinate;

varying vec2 vTextureCoordinates;

uniform mat4 uModelTransformMatrix;
uniform mat4 uCameraTransformMatrix;

void main(void) {
    gl_Position = uCameraTransformMatrix * uModelTransformMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoordinates = aTextureCoordinate;
}