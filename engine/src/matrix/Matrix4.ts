

export class Matrix4 {
    m00: number;
    m01: number;
    m02: number;
    m03: number;
    m10: number;
    m11: number;
    m12: number;
    m13: number;
    m20: number;
    m21: number;
    m22: number;
    m23: number;
    m30: number;
    m31: number;
    m32: number;
    m33: number;

    constructor(originMatrix?: number[]) {
        const [o0, o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12, o13, o14, o15] = originMatrix ?? [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.m00 = o0;
        this.m01 = o1;
        this.m02 = o2;
        this.m03 = o3;
        this.m10 = o4;
        this.m11 = o5;
        this.m12 = o6;
        this.m13 = o7;
        this.m20 = o8;
        this.m21 = o9;
        this.m22 = o10;
        this.m23 = o11;
        this.m30 = o12;
        this.m31 = o13;
        this.m32 = o14;
        this.m33 = o15;
    }

    get() {
        return [
            this.m00,
            this.m01,
            this.m02,
            this.m03,
            this.m10,
            this.m11,
            this.m12,
            this.m13,
            this.m20,
            this.m21,
            this.m22,
            this.m23,
            this.m30,
            this.m31,
            this.m32,
            this.m33
        ];
    }


    identiy() {
        this.m00 = 1;
        this.m01 = 0;
        this.m02 = 0;
        this.m03 = 0;
        this.m10 = 0;
        this.m11 = 1;
        this.m12 = 0;
        this.m13 = 0;
        this.m20 = 0;
        this.m21 = 0;
        this.m22 = 1;
        this.m23 = 0;
        this.m30 = 0;
        this.m31 = 0;
        this.m32 = 0;
        this.m33 = 1;

        return this.get();

    }

    rotateX(radians: number) {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        const r10 = this.m10;
        const r11 = this.m11;
        const r12 = this.m12;
        const r13 = this.m13;
        const r20 = this.m20;
        const r21 = this.m21;
        const r22 = this.m22;
        const r23 = this.m23;

        this.m10 = r10 * cos + r20 * sin;
        this.m11 = r11 * cos + r21 * sin;
        this.m12 = r12 * cos + r22 * sin;
        this.m13 = r13 * cos + r23 * sin;

        this.m20 = r20 * cos - r10 * sin;
        this.m21 = r21 * cos - r11 * sin;
        this.m22 = r22 * cos - r12 * sin;
        this.m23 = r23 * cos - r13 * sin;

        return this.get();

    }

    rotateY(radians: number) {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        const r00 = this.m00;
        const r01 = this.m01;
        const r02 = this.m02;
        const r03 = this.m03;
        const r20 = this.m20;
        const r21 = this.m21;
        const r22 = this.m22;
        const r23 = this.m23;

        this.m00 = r00 * cos - r20 * sin;
        this.m01 = r01 * cos - r21 * sin;
        this.m02 = r02 * cos - r22 * sin;
        this.m03 = r03 * cos - r23 * sin;

        this.m20 = r20 * cos + r00 * sin;
        this.m21 = r21 * cos + r01 * sin;
        this.m22 = r22 * cos + r02 * sin;
        this.m23 = r23 * cos + r03 * sin;

        return this.get();

    }

    rotateZ(radians: number) {
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        const r00 = this.m00;
        const r01 = this.m01;
        const r02 = this.m02;
        const r03 = this.m03;
        const r10 = this.m10;
        const r11 = this.m11;
        const r12 = this.m12;
        const r13 = this.m13;

        this.m00 = r00 * cos + r10 * sin;
        this.m01 = r01 * cos + r11 * sin;
        this.m02 = r02 * cos + r12 * sin;
        this.m03 = r03 * cos + r13 * sin;

        this.m10 = r10 * cos - r00 * sin;
        this.m11 = r11 * cos - r01 * sin;
        this.m12 = r12 * cos - r02 * sin;
        this.m13 = r13 * cos - r03 * sin;

        return this.get();

    }


    scale(vector: number[]) {
        const [x, y, z] = vector;
        this.m00 = 1 * x;
        this.m01 = this.m01 * x;
        this.m02 = this.m02 * x;
        this.m03 = this.m03 * x;
        this.m10 = this.m10 * y;
        this.m11 = this.m11 * y;
        this.m12 = this.m12 * y;
        this.m13 = this.m13 * y;
        this.m20 = this.m20 * z;
        this.m21 = this.m21 * z;
        this.m22 = this.m22 * z;
        this.m23 = this.m23 * z;

        return this.get();

    }

    translate(vector: number[]) {
        const [x, y, z] = vector;
        this.m30 = this.m30 + this.m00 * x + this.m10 * y + this.m20 * z;
        this.m31 = this.m31 + this.m01 * x + this.m11 * y + this.m21 * z;
        this.m32 = this.m32 + this.m02 * x + this.m12 * y + this.m22 * z;
        this.m33 = this.m33 + this.m03 * x + this.m13 * y + this.m23 * z;

        return this.get();
    }





}