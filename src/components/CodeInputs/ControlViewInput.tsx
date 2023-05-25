import { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./ControlViewInput.module.scss";
import { validateInput } from "../../utils/controlsActions/validateInput";
import classNames from "classnames";
import { IInputValue, IPosition } from "../../interfaces";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ControlContextValues } from "../ControlView/ControlContext";
import { MessageContextValues } from "../MainPage/MessageContext";

interface InputProps {
  index: number;
  focusedInput: number;
  arrayValue: IInputValue;
  changeFocus: (index: number) => void;
  deleteInput: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, idx: number) => void;
  onKeyDown: (key: string, idx: number, e?: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (value: string, idx: number) => void;
}

export const ControlViewInput: FC<InputProps> = (props) => {
  const { setLineCallback, currentButtonsList } = useContext(ControlContextValues);
  const {isGameRunning} = useContext(MessageContextValues);

  const [inputValue, setInputValue] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [alertPosition, setAlertPosition] = useState<IPosition>({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentClassNames = {
    input: classNames("px-1 bg-transparent order-2 grow font-mono", { "!bg-[#4d4d4d]": isFocused }),
    lineIndex: classNames(
      "group flex justify-between items-center px-1 order-1 text-white/70 w-12 select-none",
      {
        "bg-red-800/80": hasError,
        "bg-red-600/80": isFocused && hasError,
        "bg-[#666]": !hasError && isFocused,
      }
    ),
    cancel: classNames("flex opacity-0 order-3 items-center w-10 hover:opacity-100", {
      "opacity-100 bg-[#4d4d4d]": isFocused,
    }),
  };

  const setString = (str: string) => {
    setInputValue(str);
    props.onChange(str, props.index);
  };

  const addInputString = (newString: string, deepLevel: number) => {
    
    changeInput(inputRef.current?.value + newString);
    if (deepLevel === 2) {
      props.onKeyDown("Enter", props.index);
    }
  };

  const changeInput = (value: string) => {
    setLineCallback(addInputString);

    if (!validateInput(value)) {
      setHasError(false);
    }

    setString(value);
  };

  const onClickSection = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const showAlertMessage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAlertPosition({ x: e.clientX, y: e.clientY });
  };

  const onFocusInput = () => {
    setLineCallback(addInputString);
    props.changeFocus(props.index);
  };

  useEffect(() => {
    if (inputRef.current && props.focusedInput === props.index) {
      setIsFocused(true);
      inputRef.current.focus();
    } else if (isFocused) {
      setIsFocused(false);
    }
  }, [props.focusedInput, inputRef.current]);

  useEffect(() => {
    setInputValue(props.arrayValue.value);
    setHasError(props.arrayValue.hasError);
  }, [props.arrayValue]);

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        className={currentClassNames.input}
        value={inputValue}
        onKeyDown={(e) => props.onKeyDown(e.key, props.index, e)}
        onFocus={onFocusInput}
        onChange={(e) => changeInput(e.target.value)}
        ref={inputRef}
        disabled={currentButtonsList !== -1 || isGameRunning}
      />
      <div
        className={currentClassNames.lineIndex}
        onClick={onClickSection}
        onMouseMove={hasError ? showAlertMessage : undefined}
      >
        {hasError && (
          <>
            <FontAwesomeIcon icon={faCircleQuestion} size="xs" />
            <div
              className={"fixed hidden group-hover:flex " + styles.errorCloud}
              style={{ left: alertPosition?.x - 210, top: alertPosition?.y - 25 }}
            >
              <p className="text-slate-800 text-base font-normal">В строке ошибка, исправь ее!</p>
            </div>
          </>
        )}
        <code className="grow text-end">{props.index + 1}</code>
      </div>
      <div className={currentClassNames.cancel}>
        <button
          className={styles.deleteBtn}
          onClick={(e) => props.deleteInput(e, props.index)}
          disabled={currentButtonsList !== -1}
        >
          X
        </button>
      </div>
    </div>
  );
};
