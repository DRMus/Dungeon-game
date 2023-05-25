import { useContext, useState } from "react";
import { ControlContextValues } from "../ControlView/ControlContext";
import { IButtonState, IButtonValue } from "../../interfaces";
import CodeButtonList from "./CodeButtonList";

import "./codeButtons.scss";

interface Props {
  buttonValue: IButtonValue;
  isButtonOpen: IButtonState;
  index: number;
  changeButtonState: (state: boolean, idx: number) => void;
}

const CodeButtonView = (props: Props) => {
  const {
    setCurrentLineValue,
    changeCurrentButtonList,
    clearStateCallbacks,
    addStateCallback,
    currentButtonsList,
  } = useContext(ControlContextValues);

  const buttonClassName = `font-medium text-lg text-white py-0.5 px-3.5 rounded-xl enabled:hover:brightness-[1.1] disabled:brightness-[0.7] ${props.buttonValue.color}`;
  const closeButtonClassName = `absolute codeButtons-enter flex justify-center items-center cursor-pointer hover:brightness-[1.1] text-white font-medium -top-2 -left-1 w-5 h-5 rounded-full ${props.buttonValue.color}`;

  const clearState = () => {
    props.changeButtonState(false, props.index);
  };

  const onMainButtonClick = () => {
    props.changeButtonState(true, props.index);
    changeCurrentButtonList(props.buttonValue.level);
    addStateCallback(clearState);
    setCurrentLineValue(props.buttonValue.input, props.buttonValue.level);

    if (!props.buttonValue.children) {
      props.changeButtonState(false, props.index);
      changeCurrentButtonList(-1);
      clearStateCallbacks();
    }
  };

  const onCloseButtonClick = () => {
    props.changeButtonState(false, -1);
    changeCurrentButtonList(props.buttonValue.level - 1);
  };

  return (
    <div className="relative codeButtons-enter">
      <button
        className={buttonClassName}
        onClick={onMainButtonClick}
        disabled={props.isButtonOpen.state}
      >
        <span>{props.buttonValue.label}</span>
      </button>

      {props.buttonValue.children &&
        props.isButtonOpen.state &&
        props.isButtonOpen.index === props.index && (
          <>
            {currentButtonsList === props.buttonValue.level && (
              <button className={closeButtonClassName} onClick={onCloseButtonClick}>
                X
              </button>
            )}
            <div className="absolute -top-12 left-0">
              <CodeButtonList buttonsList={props.buttonValue.children} />
            </div>
          </>
        )}
    </div>
  );
};

export default CodeButtonView;
