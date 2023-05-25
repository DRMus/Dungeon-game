import React, { useContext, useEffect, useState } from "react";
import { IButtonState, IButtonValue } from "../../interfaces";
import CodeButtonView from "./CodeButtonView";
import { ControlContextValues } from "../ControlView/ControlContext";

interface Props {
  buttonsList: IButtonValue[];
}

const CodeButtonList = (props: Props) => {
  const [isButtonOpen, setIsButtonOpen] = useState<IButtonState>({state: false, index: -1});

  const changeButtonState = (state: boolean, idx: number) => {

    setIsButtonOpen({state: state, index: idx});
  };

  useEffect(() => {
    
  }, [])
  return (
    <div className="flex gap-2">
      {props.buttonsList.map((buttonValue, index) => (
        <CodeButtonView
          key={index}
          index={index}
          buttonValue={buttonValue}
          isButtonOpen={isButtonOpen}
          changeButtonState={changeButtonState}
        />
      ))}
    </div>
  );
};

export default CodeButtonList;
