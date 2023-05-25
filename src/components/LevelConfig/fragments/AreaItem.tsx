import React, { useContext, useEffect, useState } from "react";

import floor from "../../../assets/ConfigTemplates/Floor.png";

import { LevelContextValues } from "../LevelContext";
import getTexture from "../../../utils/getTexture";

interface Props {
  areaKey: number;
  position: [number, number];
}

const AreaItem = (props: Props) => {
  const { addHandler } = useContext(LevelContextValues);

  const [areaKey, setAreaKey] = useState<number>(props.areaKey);
  const [image, setImage] = useState<string>();

  const changeKey = () => {
    if (areaKey + 1 > 9) {
      setAreaKey(0);
      return;
    }
    setAreaKey(areaKey + 1);
  };

  useEffect(() => {
    setImage(getTexture(areaKey));
    addHandler(areaKey, props.position);
  }, [areaKey]);

  return (
    <img
      className="w-[32px] h-[32px] hover:brightness-125"
      onClick={changeKey}
      src={image}
      style={{ backgroundImage: `url(${floor})` }}
    />
  );
};

export default AreaItem;
