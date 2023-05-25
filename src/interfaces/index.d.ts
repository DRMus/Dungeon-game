export type StateDispatch<T = any> = React.Dispatch<React.SetStateAction<T>>;
export type IDirectionSign = -1 | 1;
export type IDirection = "x" | "y";
export type IAnimationType = "idle" | "down" | "up" | "right" | "left" | "dead";
/**
 * 0 - Проигрыш, 1 - старт, 2 - победа
 */
export type GameStates = 0 | 1 | 2;
export type ICoinDirection = "<" | ">" | "^" | "v";

export interface IConfigHandler {
  key: number;
  position: [number, number];
}

export interface ILevelConfig {
  points: number[][];
  width: () => number;
  height: () => number;
}

export interface IAreaSize {
  width: number;
  height: number;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IPositionResponse {
  code: number;
  id: string;
  direction?: ICoinDirection;
}

export interface IObstacles {
  elements: JSX.Element[];
  coins: number;
}
export interface ICodeBlocks {
  instanceName: string;
  instanceMethod: string;
  instanceValue: string;
}

export interface IInputValue {
  value: string;
  hasError: boolean;
}

export interface IButtonValue {
  label: string;
  input: string;
  color: string;
  level: number;
  children?:IButtonValue[];
}

export interface IButtonState {
  state: boolean;
  index: number;
}

export interface ICommandForGame {
  command: string;
  count: number;
}
