import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const GameViewSettings = () => {
  return (
    <Link
      to="/config"
      className="text-zinc-200 cursor-pointer hover:text-zinc-400 transition-colors"
      title="Конфигурация"
    >
      <FontAwesomeIcon icon={faGear} size="lg" />
    </Link>
  );
};

export default GameViewSettings;
