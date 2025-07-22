export function simpleTranslate(trsMatrix: number[], translation: number[]) {
    const [x, y, z] = trsMatrix;
    const [tx, ty, tz] = translation;

    return [x + tx, 0, 0, 0,
        0, y + ty, 0, 0,
        0, 0, z + tz, 0,
        0, 0, 0, 1];

}

export function simpleScale(trsMatrix: number[], scale: number[]) {
    const [x, y, z] = trsMatrix;
    const [sx, sy, sz] = scale;

    trsMatrix = [x * sx, 0, 0, 0, y * sy, 0, 0, 0, z * sz, 1];
}

export function rotateX(trsMatrix: number[], rotation: number) {
    const [x, y, z] = trsMatrix;
    trsMatrix = [
        x,
        Math.cos(rotation) * y + Math.sin(rotation) * z,
        -Math.sin(rotation) * y + Math.cos(rotation) * z,
        1,
    ];
}

export function rotateY(trsMatrix: number[], rotation: number) {
    const [x, y, z] = trsMatrix;
    trsMatrix = [
        (Math.cos(rotation) * x) - (Math.sin(rotation) * z),
        y,
        (Math.cos(rotation) * z) + (Math.sin(rotation) * x),
        1
    ]
}

export function rotateZ(trsMatrix: number[], rotation: number) {
    const [x, y, z] = trsMatrix;
    trsMatrix = [
        (Math.cos(rotation) * x) - (Math.sin(rotation) * y),
        (Math.cos(rotation) * y) + (Math.sin(rotation) * x),
        z,
        1
    ]
}