import { createContext, FC, ReactNode, useRef, useState } from "react";
import { ICommandForGame, IInputValue } from "../../interfaces";
import { parseInputToObject } from "../../utils/controlsActions/validateInput";
import { CharacterConfig } from "../../utils/constants";

interface Props {
  children: ReactNode;
}

type IFocusFunc = (index: number) => void;

interface IMessageContext {
  isGameRunning: boolean;
  currentCommand: ICommandForGame | undefined;
  setInputsInContext: (inputs: IInputValue[]) => void;
  setFocusFunction: (callback: IFocusFunc) => void;
  setGameIsOver: (state: boolean) => void;
  runCode: () => void;
}

export const MessageContextValues = createContext<IMessageContext>({
  isGameRunning: false,
  currentCommand: undefined,
  setInputsInContext: () => {},
  setFocusFunction: () => {},
  setGameIsOver: () => {},
  runCode: () => {},
});

export const MessageContextProvider: FC<Props> = ({ children }) => {
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [currentCommand, setCurrentCommand] = useState<ICommandForGame>();

  const inputValues = useRef<IInputValue[]>([]);
  const gameIsOver = useRef<boolean>(false);
  const focusFunction = useRef<{ callback: IFocusFunc }>({ callback: () => {} });

  const setInputsInContext = (inputs: IInputValue[]) => {
    inputValues.current = inputs;
  };

  const setFocusFunction = (callback: IFocusFunc) => {
    focusFunction.current.callback = callback;
  };

  const setGameIsOver = (state: boolean) => {
    gameIsOver.current = state;
  }

  const sendCommands = (parsedInputsArray: ICommandForGame[], idx: number) => {
    if (gameIsOver.current) {
      setIsGameRunning(false);
      return;
    }
    
    focusFunction.current?.callback(idx);

    const command = parsedInputsArray[idx];
    if (command.command === "empty") {
      if (parsedInputsArray[idx + 1] === undefined) {
        setIsGameRunning(false);
        setCurrentCommand(undefined);
        return;
      }
      sendCommands(parsedInputsArray, idx + 1);
      return;
    }
    const timeoutTime =
      CharacterConfig.ANIMATION_DURATION_SECONDS * 1000 * command.count +
      CharacterConfig.ANIMATION_DURATION_SECONDS * 1000;
    setCurrentCommand(command);
    setTimeout(() => {
      sendCommands(parsedInputsArray, idx + 1);
    }, timeoutTime);
  };

  const runCode = () => {
    let errorKey = false;

    let parsedInputsArray = inputValues.current.map((item) => {
      let parsedString: string[] | ICommandForGame | null = item.value.split(/[.\(\)]/);
      parsedString.pop();
      if (item.hasError) {
        errorKey = true;
      }

      if (errorKey) {
        return { command: "error", count: 0 };
      }
      parsedString = parseInputToObject(parsedString);
      return parsedString;
    });

    if (errorKey || parsedInputsArray.length === 0) {
      console.log("error");
      return;
    }

    setIsGameRunning(true);
    sendCommands(parsedInputsArray, 0);
  };

  return (
    <MessageContextValues.Provider
      value={{
        isGameRunning,
        currentCommand,
        setFocusFunction,
        setInputsInContext,
        setGameIsOver,
        runCode,
      }}
    >
      {children}
    </MessageContextValues.Provider>
  );
};
