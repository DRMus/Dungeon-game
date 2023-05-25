import React from "react";
import GameButton from "../../Templates/GameButton";
import { NavigateFunction } from "react-router";

interface Props {
  navigate: NavigateFunction;
}

const EmptyConfig = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-lg font-bold text-slate-200">Создайте уровень в /config</p>
      <GameButton onClick={(e) => props.navigate("config")} className="text-slate-200">
        Конфигурация
      </GameButton>
    </div>
  );
};

export default EmptyConfig;
