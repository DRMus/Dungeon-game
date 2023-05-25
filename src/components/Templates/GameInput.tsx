import classNames from "classnames";
import React, { useEffect, useState } from "react";

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  header: string;
  maxValueGame?: number;
  minValueGame?: number;
}

const GameInput = ({
  className,
  header,
  value,
  onChange,
  maxValueGame,
  minValueGame,
  ...props
}: Props) => {
  const [currentValue, setCurrentValue] = useState<number>(Number.parseInt(`${value}`));

  const handleValue = (e: any) => {
    let targetValue = Number.parseInt(e.target.value as string);
    if (
      (isNaN(targetValue) ||
        (maxValueGame && targetValue > maxValueGame) ||
        (minValueGame && targetValue < minValueGame)) &&
      props.type === "number"
    ) {
      if (maxValueGame && targetValue > maxValueGame) setCurrentValue(maxValueGame);
      else if (minValueGame && targetValue < minValueGame) setCurrentValue(minValueGame);
      else setCurrentValue(currentValue);
      return;
    }
    setCurrentValue(targetValue);
    onChange && onChange(e);
  };

  useEffect(() => {
    setCurrentValue(Number.parseInt(`${value || minValueGame || 0}`));
  }, [value, minValueGame]);
  return (
    <div className="w-full relative text-slate-200">
      <p className="absolute -top-3 left-2 text-sm bg-slate-transparent font-medium select-none">
        {header}
      </p>
      <input
        className={classNames(
          "w-full bg-transparent border-2 border-slate-600 px-2 py-1 rounded-md",
          className
        )}
        value={currentValue}
        onChange={handleValue}
        {...props}
      />
    </div>
  );
};

export default GameInput;
