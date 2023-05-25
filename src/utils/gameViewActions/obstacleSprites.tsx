import Konva from "konva";
import { Rect, Sprite } from "react-konva";
import { ILevelConfig, IObstacles } from "../../interfaces";
import getTexture from "../getTexture";
import { COIN_SPRITE_ANIMATIONS, StageConfig } from "../constants";

import coin from "../../assets/Items/coin.png";

function* generKey() {
  let key = 0;
  while (true) {
    key++;
    yield key
  }
}
const generator = generKey();

const obstacleSprites = (levelConfig: ILevelConfig | null): IObstacles => {
  let sprites: IObstacles = { elements: [], coins: 0 };
  
  if (!levelConfig) return sprites;

  levelConfig.points.forEach((row, rowIndex) => {
    row.forEach((item, itemIndex) => {
      if (item === 0) return;

      let image = document.createElement("img");
      image.src = getTexture(item);
      let sprite = (
        <Sprite
          key={`${rowIndex}-${itemIndex}-${generator.next().value}`}
          width={StageConfig.BG_ITEM_SIZE}
          height={StageConfig.BG_ITEM_SIZE}
          x={itemIndex * StageConfig.BG_ITEM_SIZE}
          y={rowIndex * StageConfig.BG_ITEM_SIZE}
          animation={"idle"}
          animations={{ idle: [0, 0, StageConfig.BG_ITEM_SIZE, StageConfig.BG_ITEM_SIZE] }}
          image={image}
        />
      );

      if (item === 9) {
        image.src = coin;
        sprites.coins += 1;
        sprite = (
          <Sprite
            ref={(node) => {
              if (node && !node.isRunning()) node.start();
            }}
            id={`${rowIndex}-${itemIndex}`}
            key={`${rowIndex}-${itemIndex}-${generator.next().value}`}
            width={StageConfig.BG_ITEM_SIZE}
            height={StageConfig.BG_ITEM_SIZE}
            x={itemIndex * StageConfig.BG_ITEM_SIZE}
            y={rowIndex * StageConfig.BG_ITEM_SIZE}
            animation={"idle"}
            animations={COIN_SPRITE_ANIMATIONS}
            frameRate={12}
            frameIndex={0}
            image={image}
          />
        );
      }
      sprites.elements.push(sprite);
    });
  });
  return sprites;
};

export default obstacleSprites;
