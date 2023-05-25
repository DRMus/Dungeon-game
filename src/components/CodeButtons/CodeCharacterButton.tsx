import { CODE_BUTTONS_LIST } from "../../utils/constants";
import CodeButtonList from "./CodeButtonList";

const CodeCharacterButton = () => {
  return (
    <div className="z-full">
        <CodeButtonList buttonsList={CODE_BUTTONS_LIST} />
    </div>
  );
};

export default CodeCharacterButton;
