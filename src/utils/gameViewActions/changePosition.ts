import { Sprite } from "konva/lib/shapes/Sprite";
import {
  StateDispatch,
  IDirection,
  IDirectionSign,
  ILevelConfig,
  IPosition,
  IPositionResponse,
  ICoinDirection,
} from "../../interfaces";
import { CharacterConfig, OBSTACLES, StageConfig } from "../constants";

const directionFromCoin = (
  direction: IDirection,
  directionSign: IDirectionSign
): ICoinDirection => {
  if (direction === "x" && directionSign === -1) return "<";
  if (direction === "x" && directionSign === 1) return ">";
  if (direction === "y" && directionSign === -1) return "^";
  if (direction === "y" && directionSign === 1) return "v";
  return ">";
};

/**
 * Функция изменения позиции персонажа, определения препятствий и других эвентов
 *
 * @param ref - Рефференс на спрайт персонажа
 * @param position - Позиция персонажа
 * @param setPosition - Функция хука useState для установки позиции
 * @param direction - Направление персонажа
 * @param directionSign - Знак для определения движения (вперед - [1], назад - [-1])
 * @param levelConfig - Массив препятствий
 * @returns   [{
 *              code: 0 - Перемещение на пустую клетку | 1 - Столкновение | 2 - Поднятие монетки,
 *              id: number,
 *              direction?: string
 *            }]
 */

const changePosition = (
  ref: React.RefObject<Sprite>,
  position: IPosition,
  setPosition: StateDispatch<number>,
  direction: IDirection,
  directionSign: IDirectionSign,
  levelConfig: ILevelConfig
): IPositionResponse => {
  let changePos = {};

  let nextPosition = direction === "x" ? position.x : position.y;
  nextPosition += CharacterConfig.STEP * directionSign;

  let nextArrayPosition: IPosition = {
    x: Math.ceil(
      (position.x + (direction === "x" ? CharacterConfig.STEP * directionSign : 0)) /
        StageConfig.BG_ITEM_SIZE
    ),
    y: Math.ceil(
      (position.y + (direction === "y" ? CharacterConfig.STEP * directionSign : 0)) /
        StageConfig.BG_ITEM_SIZE
    ),
  };

  const moveCondition = (direction4Condition: IDirection) =>
    direction === direction4Condition &&
    nextPosition < levelConfig.width() &&
    nextPosition >= 0 &&
    !OBSTACLES.includes(levelConfig.points[nextArrayPosition.y][nextArrayPosition.x]);

  if (moveCondition("x")) {
    changePos = { x: nextPosition };
  } else if (direction === "x") {
    return { code: 1, id: `${nextArrayPosition.y}-${nextArrayPosition.x}` };
  }

  if (moveCondition("y")) {
    changePos = { y: nextPosition };
  } else if (direction === "y") {
    return { code: 1, id: `${nextArrayPosition.y}-${nextArrayPosition.x}` };
  }

  ref.current?.to({
    duration: CharacterConfig.ANIMATION_DURATION_SECONDS,
    ...changePos,
  });

  setPosition(nextPosition);

  if (levelConfig.points[nextArrayPosition.y][nextArrayPosition.x] === 9) {
    return {
      code: 2,
      id: `${nextArrayPosition.y}-${nextArrayPosition.x}`,
      direction: directionFromCoin(direction, directionSign),
    };
  }
  return { code: 0, id: "" };
};

export default changePosition;
