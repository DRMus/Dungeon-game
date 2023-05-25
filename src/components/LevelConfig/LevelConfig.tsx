import React, { useCallback, useEffect, useState } from "react";
import AreaItem from "./fragments/AreaItem";
import { StageConfig, createLeveltemplate } from "../../utils/constants";
import LevelContext from "./LevelContext";
import AreaConfig from "./fragments/AreaConfig";
import AreaActions from "./fragments/AreaActions";
import { IAreaSize, ILevelConfig } from "../../interfaces";
import storageActions from "../../utils/storageActions";

const LevelConfig = () => {
  const [levelConfig, setLevelConfig] = useState<number[][]>();
  const [areaSize, setAreaSize] = useState<IAreaSize>({ width: 15, height: 15 });

  const changeArray = useCallback(
    (height: number, width: number) => {
      let changedArray: number[][] = levelConfig as number[][];

      if (areaSize.height < height) {
        let newRows: number[][] = [];

        for (let i = 0; i < height - areaSize.height; i++) {
          newRows.push(new Array(areaSize.width).fill(0));
        }

        changedArray.push(...newRows);
      } else {
        changedArray = changedArray.slice(0, height);
      }

      if (areaSize.width < width) {
        changedArray = changedArray.map((item) => {
          let newCols = new Array(width - areaSize.width).fill(0);
          item.push(...newCols);
          return item;
        });
      } else {
        changedArray = changedArray.map((item) => item.slice(0, width));
      }
      return changedArray;
    },
    [areaSize, levelConfig]
  );

  const getConfig = useCallback(() => {
    let configStorage: number[][] | undefined = storageActions.getLevelConfig()?.points;
    let configTemplate: number[][] = createLeveltemplate(areaSize.height, areaSize.width);

    let config = configStorage || configTemplate;

    setLevelConfig(config);
    setAreaSize({ width: config[0].length, height: config.length });
  }, []);

  const deleteConfig = () => {
    storageActions.deleteLevelConfig();
    document.location.reload();
  };

  const changeAreaSize = (height: number, width: number) => {
    setLevelConfig(changeArray(height, width));
    setAreaSize({ width, height });
  };

  useEffect(() => {
    getConfig();
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-900">
      <LevelContext levelConfig={levelConfig || []}>
        <div className="min-w-main h-[95%] flex flex-col gap-10">
          <AreaConfig levelConfig={levelConfig || []} />
          <AreaActions changeAreaSize={changeAreaSize} deleteConfig={deleteConfig} areaSize={areaSize} />
        </div>
      </LevelContext>
    </div>
  );
};

export default LevelConfig;
