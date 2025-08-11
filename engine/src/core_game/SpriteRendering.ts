import * as engine from "../engine/entry"

const eTCI = engine.eTextureCoordinatesIndex;

export class SpriteRendering extends engine.Scene {
    kFontImage: string;
    kMinionSprite: string;
    mCamera: null | engine.Camera;
    mHero: null | engine.SpriteRenderable;
    mPortal: null | engine.SpriteRenderable;
    mCollector: null | engine.SpriteRenderable;
    mFontImage: null | engine.SpriteRenderable;
    mMinion: null | engine.SpriteRenderable;
    mRightMinion: null | engine.SpriteAnimateRenderable;
    constructor() {
        super();

        this.kFontImage = "assets/images/consolas-72.png";
        this.kMinionSprite = "assets/images/minion_sprite.png";

        this.mCamera = null;

        this.mHero = null;
        this.mPortal = null;
        this.mCollector = null;
        this.mFontImage = null;
        this.mMinion = null;
        this.mRightMinion = null;

    }

    load() {
        engine.texture.load(this.kFontImage);
        engine.texture.load(this.kMinionSprite);
    }

    unload() {
        engine.texture.unload(this.kFontImage);
        engine.texture.unload(this.kMinionSprite);
    }

    init() {
        this.mCamera = new engine.Camera([20, 60], 20, [20, 40, 600, 300]);
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1.0]);

        this.mPortal = new engine.SpriteRenderable(this.kMinionSprite);
        this.mPortal.setColor([1.0, 0, 0, 0.2]);
        this.mPortal.getTransform().setPosition(25, 60).setSize(3, 3);
        this.mPortal.setElementPixelPositions(130, 310, 0, 180);

        this.mCollector = new engine.SpriteRenderable(this.kMinionSprite);
        this.mCollector.setColor([0, 0, 0, 0]);
        this.mCollector.getTransform().setPosition(15, 60).setSize(3, 3);
        this.mCollector.setElementUVCoordinate(0.308, 0.483, 0, 0.352);

        this.mFontImage = new engine.SpriteRenderable(this.kFontImage);
        this.mFontImage.setColor([1.0, 1.0, 1.0, 0]);
        this.mFontImage.getTransform().setPosition(13, 62).setSize(4, 4);

        this.mMinion = new engine.SpriteRenderable(this.kMinionSprite);
        this.mMinion.setColor([1.0, 1.0, 1.0, 0]);
        this.mMinion.getTransform().setPosition(26, 56).setSize(5, 2.5);

        this.mHero = new engine.SpriteRenderable(this.kMinionSprite);
        this.mHero.setColor([1.0, 1.0, 1.0, 0]);
        this.mHero.getTransform().setPosition(20, 60).setSize(2, 3);
        this.mHero.setElementPixelPositions(0, 120, 0, 180);

        this.mRightMinion = new engine.SpriteAnimateRenderable(this.kMinionSprite);
        this.mRightMinion.setColor([1, 1, 1, 0]);
        this.mRightMinion.getTransform().setPosition(26, 56.5).setSize(4, 3.2);
        this.mRightMinion.setSpriteSequence(512, 0, 204, 164, 5, 0);
        this.mRightMinion.setAnimationType(engine.eAnimationType.eRight);
        this.mRightMinion.setAnimationSpeed(50);

    }

    update() {
        // Simple game: move the white square and pulse the red
        const deltaX = 0.05;
        const heroTransform = this.mHero?.getTransform();

        // Step A: test for white square movement
        if (engine.input.isKeyPressed(engine.input.keys.right)) {
            engine.audio.changeBackgroundVolume();
            if (heroTransform!.getXPosition() > 30) {
                // right-bound of the window
                heroTransform!.setPosition(12, 60);
            }
            heroTransform!.increaseXPositionBy(deltaX);
        }
        // Step B: test for white square rotation
        if (engine.input.isKeyPressed(engine.input.keys.left)) {
            heroTransform!.increaseXPositionBy(-deltaX);
            if (heroTransform!.getXPosition() < 11) {
                this.next();
            }
        }

        if (engine.input.isKeyPressed(engine.input.keys.Q)) this.stop();

        let c = this.mPortal!.getColor();
        let ca = c[3] + deltaX;
        if (ca > 1) {
            ca = 0;
        }
        c[3] = ca;

        const deltaT = 0.001;

        const textureCoordinates = this.mFontImage!.getElementUVCoordinates();

        let bottom = textureCoordinates[eTCI.eBottom] + deltaT;
        let right = textureCoordinates[eTCI.eRight] - deltaT;

        if (bottom > 1.0) {
            bottom = 0;
        }
        if (right < 0) {
            right = 1.0;
        }

        this.mFontImage!.setElementUVCoordinate(textureCoordinates[eTCI.eLeft], right, bottom, textureCoordinates[eTCI.eTop]);

        const minionCoordinates = this.mMinion!.getElementUVCoordinates();

        let top = minionCoordinates[eTCI.eTop] - deltaT;
        let left = minionCoordinates[eTCI.eLeft] + deltaT;

        if (left > 0.5) {
            left = 0.0;
        }
        if (top < 0.5) {
            top = 1.0;
        }

        this.mMinion!.setElementUVCoordinate(left, textureCoordinates[eTCI.eRight], textureCoordinates[eTCI.eBottom], top);

        this.mRightMinion?.updateAnimation();

        if (engine.input.isKeyClicked(engine.input.keys.one)) {
            this.mRightMinion?.setAnimationType(engine.eAnimationType.eLeft);
        }

        if (engine.input.isKeyClicked(engine.input.keys.two)) {
            this.mRightMinion?.setAnimationType(engine.eAnimationType.eSwing);
        }

        if (engine.input.isKeyClicked(engine.input.keys.four)) {
            this.mRightMinion?.changeAnimationSpeed(-2);
        }

        if (engine.input.isKeyClicked(engine.input.keys.five)) {
            this.mRightMinion?.changeAnimationSpeed(2);
        }

    }

    draw() {
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]);

        const camera = this.mCamera!
        camera.setViewAndCameraMatrix();
        this.mFontImage?.draw(camera);
        this.mPortal?.draw(camera);
        this.mCollector?.draw(camera);
        this.mHero?.draw(camera);
        this.mRightMinion?.draw(camera);
        //this.mMinion?.draw(camera);
    }
}