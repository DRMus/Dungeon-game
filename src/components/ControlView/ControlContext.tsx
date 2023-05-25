import { FC, ReactNode, createContext, useRef, useState } from "react";

interface Props {
  children: ReactNode;
}

interface IInputCallback {
  callback: (newString: string, deepLevel: number) => void;
}

interface IDropStatesCallback {
  callback: () => void;
}

interface ControlContext {
  currentButtonsList: number;
  setLineCallback: (callback: (newString: string, deepLevel: number) => void) => void;
  setCurrentLineValue: (newString: string, deepLevel: number) => void;
  addStateCallback: (callback: () => void) => void;
  changeCurrentButtonList: (index: number) => void;
  clearStateCallbacks: () => void;
}

export const ControlContextValues = createContext<ControlContext>({
  currentButtonsList: -1,
  setLineCallback: () => {},
  setCurrentLineValue: () => {},
  addStateCallback: () => {},
  changeCurrentButtonList: () => {},
  clearStateCallbacks: () => {},
});

export const ControlContextProvider: FC<Props> = ({ children }) => {
  const inputCallback = useRef<IInputCallback>();
  const buttonsStates = useRef<IDropStatesCallback[]>([]);

  const [currentButtonsList, setCurrentButtonsList] = useState<number>(-1);

  const setLineCallback = (callback: (newString: string, deepLevel: number) => void) => {
    inputCallback.current = { callback };
  };

  const addStateCallback = (callback: () => void) => {
    buttonsStates.current.push({ callback });
  };

  const clearStateCallbacks = () => {
    buttonsStates.current.forEach((item) => {
      item.callback();
    });
  };

  const setCurrentLineValue = (newString: string, deepLevel: number) => {
    if (!inputCallback.current) {
      console.log("Нет функции");
      return;
    }
    inputCallback.current.callback(newString, deepLevel);
  };

  const changeCurrentButtonList = (index: number) => {
    setCurrentButtonsList(index);
  };

  return (
    <ControlContextValues.Provider
      value={{
        currentButtonsList,
        setLineCallback,
        setCurrentLineValue,
        changeCurrentButtonList,
        addStateCallback,
        clearStateCallbacks,
      }}
    >
      {children}
    </ControlContextValues.Provider>
  );
};
