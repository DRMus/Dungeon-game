import { IButtonValue } from "../interfaces";

export enum CharacterConfig {
  CHARACTER_SIZE = 31.2,
  START_POSITION_X = 0,
  START_POSITION_Y = 0,
  STEP = 32,
  ANIMATION_DURATION_SECONDS = 0.5,
}

export enum AnimationType {
  IDLE = "idle",
  DOWN = "down",
  UP = "up",
  RIGHT = "right",
  LEFT = "left",
  DEAD = "dead",
}

export enum StageConfig {
  BG_ITEM_SIZE = 32,
}

export const OBSTACLES = [1, 2, 3, 4, 5, 6, 7, 8];

export const CHARACTER_SPRITE_ANIMATIONS = {
  idle: [1 + 48 * 2, 3, 48, 48, 1 + 48 * 2, 5, 48, 48],
  down: [1, 3, 48, 48, 1 + 48 * 4, 3, 48, 48],
  left: [1, 3 + 48 * 2, 48, 48, 1 + 48 * 4, 3 + 48 * 2, 48, 48],
  right: [1, 3 + 48 * 4, 48, 48, 1 + 48 * 4, 3 + 48 * 4, 48, 48],
  up: [1, 3 + 48 * 6, 48, 48, 1 + 48 * 4, 3 + 48 * 6, 48, 48],
  dead: [
    -1 + 48 * 2,
    3,
    48,
    48,
    3 + 48 * 2,
    0,
    48,
    48,
    -1 + 48 * 2,
    -3,
    48,
    48,
    3 + 48 * 2,
    -7,
    48,
    48,
    -1 + 48 * 2,
    -10,
    48,
    48,
  ],
};

export const COIN_SPRITE_ANIMATIONS = {
  idle: [
    0, 0, 32, 32, 32, 0, 32, 32, 64, 0, 32, 32, 96, 0, 32, 32, 128, 0, 32, 32, 160, 0, 32, 32, 192,
    0, 32, 32,
  ],
};

export const createLeveltemplate = (height: number = 4, width: number = 4): number[][] => {
  let levelConfigTemplate: number[][] = new Array(height).fill([]);

  levelConfigTemplate = levelConfigTemplate.map((item) => {
    item = new Array(width).fill(0);
    return item;
  });

  return levelConfigTemplate;
};

const BUTTON_COLORS = [
  " bg-cyan-400 shadow-[0_4px_0_0_#078d93] ",
  " bg-[#7cc800] shadow-[0_4px_0_0_#598f00] ",
  " bg-[#ff0a7b] shadow-[0_4px_0_0_#af0955] ",
];

const CODE_NUMBERS_ARRAY: IButtonValue[] = [
  {
    label: "1",
    input: "1)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "2",
    input: "2)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "3",
    input: "3)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "4",
    input: "4)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "5",
    input: "5)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "6",
    input: "6)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "7",
    input: "7)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "8",
    input: "8)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
  {
    label: "9",
    input: "9)",
    level: 2,
    color: BUTTON_COLORS[2],
  },
];

export const CODE_BUTTONS_LIST: IButtonValue[] = [
  {
    label: "character",
    input: "character.",
    color: BUTTON_COLORS[0],
    level: 0,
    children: [
      {
        label: "up",
        input: "up(",
        color: BUTTON_COLORS[1],
        level: 1,
        children: CODE_NUMBERS_ARRAY,
      },
      {
        label: "down",
        input: "down(",
        color: BUTTON_COLORS[1],
        level: 1,
        children: CODE_NUMBERS_ARRAY,
      },
      {
        label: "right",
        input: "right(",
        color: BUTTON_COLORS[1],
        level: 1,
        children: CODE_NUMBERS_ARRAY,
      },
      {
        label: "left",
        input: "left(",
        color: BUTTON_COLORS[1],
        level: 1,
        children: CODE_NUMBERS_ARRAY,
      },
    ],
  },
];

export const CHARACTER_ACTIONS = [
  ["character"],
  ["up", "down", "right", "left"],
  ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
];
