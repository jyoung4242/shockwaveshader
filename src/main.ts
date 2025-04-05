// main.ts
import "./style.css";

import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, Actor, Vector } from "excalibur";
import { model, template } from "./UI/UI";
import { loader, Resources } from "./resources";
import { ShockWavePostProcessor } from "./Shaders/shockwave";

await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
});

await game.start(loader);

class backGroundSTaticActor extends Actor {
  constructor() {
    super({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });
  }

  onInitialize(engine: Engine): void {
    this.graphics.use(Resources.checkerboard.toSprite());
    engine.currentScene.camera.strategy.lockToActor(this);
  }
}

game.add(new backGroundSTaticActor());

const shockWavePP = new ShockWavePostProcessor();
shockWavePP.init(game.currentScene);
game.graphicsContext.addPostProcessor(shockWavePP);

game.input.pointers.primary.on("down", e => {
  let pos = new Vector(e.screenPos.x / 800, e.screenPos.y / 600);
  shockWavePP.triggerShockWave(
    pos,
    Math.random() * 2000 + 500, // duration
    Math.random() * 100 + 20, // speed
    Math.random() * 0.5 + 0.1, // max radius
    Math.random() * 0.1 + 0.01 // thickness
  );
});
