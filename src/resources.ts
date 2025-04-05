// resources.ts
import { ImageSource, Loader, Sprite, SpriteSheet } from "excalibur";
import demo from "./Assets/demo.jpg"; // replace this
import checkerboard from "./Assets/checkerboard.jpg";

export const Resources = {
  demo: new ImageSource(demo),
  checkerboard: new ImageSource(checkerboard),
};

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
