import classNames from "classnames";
import React from "react";

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ConfigSection = ({ children, className, ...props }: Props) => {
  return (
    <div className={classNames("bg-slate-800/50 rounded-md border border-slate-700/50", className)} {...props}>
      {children}
    </div>
  );
};

export default ConfigSection;
