import React, { useEffect, useRef } from "react";
import { IConfigHandler } from "../../interfaces";
import storageActions from "../../utils/storageActions";

interface Props {
  children: React.ReactNode;
  levelConfig: number[][];
}

interface LevelContext {
  saveAreaValues: () => void;
  addHandler: (key: number, position: [number, number]) => void;
}

export const LevelContextValues = React.createContext<LevelContext>({
  saveAreaValues: function (): void {
    throw new Error("Function not implemented.");
  },
  addHandler: function (): void {
    throw new Error("Function not implemented.");
  },
});

const LevelContext = ({ children, ...props }: Props) => {
  const handlersRef = useRef<IConfigHandler[]>([]);

  const saveAreaValues = () => {
    let arr = props.levelConfig;
    handlersRef.current.forEach((item) => {
      arr[item.position[0]][item.position[1]] = item.key;
    });
    storageActions.setLevelConfig(arr);
  };

  const addHandler = (key: number, position: [number, number]) => {
    handlersRef.current.push({
      key,
      position,
    });
  };

  const filterHandlers = () => {
    handlersRef.current = handlersRef.current.filter(
      (item) =>
        !(
          item.position[0] >= props.levelConfig.length ||
          item.position[1] >= props.levelConfig[0].length
        )
    );
  };

  useEffect(() => {
    filterHandlers();
  }, [props.levelConfig])

  return (
    <LevelContextValues.Provider
      value={{
        addHandler,
        saveAreaValues,
      }}
    >
      {children}
    </LevelContextValues.Provider>
  );
};

export default LevelContext;
