import { ILevelConfig } from "../interfaces";
import { StageConfig } from "./constants";
import isJson from "./isJson";

const storageActions = {
  setLevelConfig: (data: number[][]) => localStorage.setItem("level-config", JSON.stringify(data)),
  getLevelConfig: () => {
    let storage = localStorage.getItem("level-config");
    if (!storage || !isJson(storage)) {
      return null;
    }
    let config: ILevelConfig = {
      points: JSON.parse(storage) as number[][],
      height: function () {
        return this.points.length * StageConfig.BG_ITEM_SIZE;
      },
      width: function () {
        return this.points[0].length * StageConfig.BG_ITEM_SIZE;
      },
    };
    return config;
  },
  deleteLevelConfig: () => localStorage.removeItem("level-config"),
};

export default storageActions;
