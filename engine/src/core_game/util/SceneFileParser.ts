import * as engine from "../../engine/entry.ts";
import type { Renderable } from "../../engine/renderables/Renderable.ts";
import type { TVector4 } from "../../matrix/VectorTypes.ts";

export class SceneFileParser {
  xml: XMLDocument;
  constructor(xml: XMLDocument) {
    this.xml = xml;
  }

  parseCamera() {
    const cameraElement = getElement(this.xml, "Camera")[0];
    const cX = getXMLNumber(cameraElement, "CenterX");
    const cY = getXMLNumber(cameraElement, "CenterY");
    const w = getXMLNumber(cameraElement, "Width");
    const viewport = getXMLColleciton(cameraElement, "Viewport") as TVector4;
    const bgColor = getXMLColleciton(cameraElement, "BgColor") as TVector4;

    const camera = new engine.Camera([cX, cY], w, viewport);

    camera.setBackgroundColor(bgColor);
    return camera;
  }

  parseSquares(sqSet: Renderable[]) {
    const sqElement = getElement(this.xml, "Square");

    Array.from(sqElement).forEach((square) => {
      const rSquare = new engine.Renderable();

      rSquare.setColor(getXMLColleciton(square, "Color") as TVector4);

      const transform = rSquare.getTransform();

      transform.setPosition(
        getXMLNumber(square, "PositionX"),
        getXMLNumber(square, "PositionY")
      );

      transform.setRotationInDegree(getXMLNumber(square, "Rotation"));

      transform.setSize(
        getXMLNumber(square, "Width"),
        getXMLNumber(square, "Height")
      );

      sqSet.push(rSquare);
    });
  }


  parseTextureSquares(squares: Renderable[]) {
    const sqElement = getElement(this.xml, "TextureSquare");

    Array.from(sqElement).forEach((square) => {
      const rSquare = new engine.TextureRenderable(getXMLString(square, "Texture"));

      rSquare.setColor(getXMLColleciton(square, "Color") as TVector4);

      const transform = rSquare.getTransform();

      transform.setPosition(
        getXMLNumber(square, "PositionX"),
        getXMLNumber(square, "PositionY")
      );

      transform.setRotationInDegree(getXMLNumber(square, "Rotation"));

      transform.setSize(
        getXMLNumber(square, "Width"),
        getXMLNumber(square, "Height")
      );

      squares.push(rSquare);
    });
  }
}

function getXMLNumber(element: Element, attributeName: string) {
  return Number(element.getAttribute(attributeName));
}

function getXMLColleciton(element: Element, attributeName: string) {
  return element
    .getAttribute(attributeName)!
    .split(" ")
    .map((val) => Number(val));
}

function getXMLString(element: Element, attributeName: string) {
  return element.getAttribute(attributeName)!;
}

function getElement(xmlContent: XMLDocument, elementTag: string) {
  const extracted = xmlContent.getElementsByTagName(elementTag);

  if (!extracted.length) {
    console.error("Warning: Level element: [" + elementTag + "] is not found!");
  }

  return extracted;
}
