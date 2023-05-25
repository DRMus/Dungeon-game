import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const PlayButton: FC<Props> = (props) => {
  const buttonClassName =
    "grid place-items-center bg-gradient-to-b from-zinc-200 from-30% to-zinc-400 to-100% w-20 h-20 rounded-full enabled:hover:brightness-[1.1] enabled:active:brightness-[0.9] disabled:brightness-[0.7]";
  return (
    <button className={buttonClassName} onClick={props.onClick} disabled={props.disabled}>
      <span className="">
        <FontAwesomeIcon icon={faPlay} size="2xl" className="text-emerald-500/80" />
      </span>
    </button>
  );
};

export default PlayButton;
