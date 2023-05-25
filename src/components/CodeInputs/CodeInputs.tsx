import { useContext, useEffect, useState } from "react";
import { ControlViewInput } from "./ControlViewInput";
import { IInputValue } from "../../interfaces";
import { validateInput } from "../../utils/controlsActions/validateInput";
import { MessageContextValues } from "../MainPage/MessageContext";

export const CodeInputs = () => {
  const { setInputsInContext, setFocusFunction } = useContext(MessageContextValues);
  const [inputs, setInputs] = useState<IInputValue[]>([{ value: "", hasError: false }]);
  const [focusedInput, setFocusedInput] = useState<number>(0);

  const onInputKeyDown = (key: string, idx: number, e?: React.KeyboardEvent<HTMLInputElement>) => {
    switch (key) {
      case "Enter":
        e && e.preventDefault();
        let newInputsArr = Array.from(inputs);
        newInputsArr.splice(idx + 1, 0, { value: "", hasError: false });
        setInputs(newInputsArr);
        setFocusedInput(focusedInput + 1);
        break;
      case "Backspace":
        if (inputs[idx].value === "" && idx !== 0) {
          deleteInput(null, idx);
          setFocusedInput(focusedInput - 1);
        }
        break;
      case "ArrowUp":
        e && e.preventDefault();
        setFocusedInput(idx !== 0 ? focusedInput - 1 : 0);
        break;
      case "ArrowDown":
        e && e.preventDefault();
        setFocusedInput(idx !== inputs.length - 1 ? focusedInput + 1 : idx);
        break;
    }
  };

  const changeInput = (value: string, idx: number) => {
    setInputs((prev) => {
      prev[idx] = { value: value, hasError: validateInput(value) };
      return prev;
    });
  };

  const deleteInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    idx: number
  ) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setInputs(inputs.filter((_, index) => index !== idx));
    setFocusedInput((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const changeFocus = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    setFocusedInput(index);
  };

  useEffect(() => {
    if (inputs.length === 0) {
      setInputs([{ value: "", hasError: false }]);
    }
    setInputsInContext(inputs);
  }, [inputs]);

  useEffect(() => {
    setFocusFunction(changeFocus);
  }, []);

  return (
    <>
      {inputs.map((value, index) => (
        <ControlViewInput
          key={value.value + index + inputs.length}
          index={index}
          arrayValue={value}
          focusedInput={focusedInput}
          changeFocus={changeFocus}
          deleteInput={deleteInput}
          onKeyDown={onInputKeyDown}
          onChange={changeInput}
        />
      ))}
    </>
  );
};
