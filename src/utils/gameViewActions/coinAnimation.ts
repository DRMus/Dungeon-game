import Konva from "konva";
import { IPositionResponse } from "../../interfaces";
import { StageConfig } from "../constants";

const coinAnimation = (sprite: Konva.Sprite, response: IPositionResponse) => {
  let spritePosition = sprite.getPosition();

  switch (response.direction) {
    case "<":
      sprite.to({
        duration: 0.2,
        x: spritePosition.x + StageConfig.BG_ITEM_SIZE / 2,
      });
      break;
    case ">":
      sprite.to({
        duration: 0.2,
        x: spritePosition.x - StageConfig.BG_ITEM_SIZE / 2,
      });
      break;
    case "^":
      sprite.to({
        duration: 0.2,
        y: spritePosition.y + StageConfig.BG_ITEM_SIZE / 2,
      });
      break;
    case "v":
      sprite.to({
        duration: 0.2,
        y: spritePosition.y - StageConfig.BG_ITEM_SIZE / 2,
      });
      break;
    default:
      break;
  }

  setTimeout(() => sprite.destroy(), 250);
};

export default coinAnimation