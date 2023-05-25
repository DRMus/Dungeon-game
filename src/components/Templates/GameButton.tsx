import classNames from "classnames";
import React from "react";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  func?: "ok" | "alert";
}

const GameButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={classNames(
        "px-3 py-1 h-fit border-2 transition-colors rounded-md font-medium text-slate-200 hover:text-slate-800 focus:text-slate-800 select-none",
        className,
        {
          "border-emerald-400 hover:bg-emerald-400 hover:drop-shadow-button-ok focus:bg-emerald-400 focus:drop-shadow-button-ok": props.func === "ok",
          "border-red-600 hover:bg-red-600 hover:drop-shadow-button-alert focus:bg-red-600 focus:drop-shadow-button-alert ": props.func === "alert",
          "border-slate-200 hover:bg-slate-200 hover:drop-shadow-button-default focus:bg-slate-200 focus:drop-shadow-button-default ": !props.func,
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default GameButton;
