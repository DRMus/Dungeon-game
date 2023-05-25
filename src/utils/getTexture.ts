import wallXIn from "../assets/ConfigTemplates/wall-x_in.png";
import wallXOut from "../assets/ConfigTemplates/wall-x_out.png";
import wallXCorner from "../assets/ConfigTemplates/wall-x-corner.png";
import wallXCorner2 from "../assets/ConfigTemplates/wall-x-corner-2.png";
import wallY from "../assets/ConfigTemplates/wall-y.png";
import wallYReversed from "../assets/ConfigTemplates/wall-y-rev.png";
import wallYDark from "../assets/ConfigTemplates/wall-y-dark.png";
import wallYReversedDark from "../assets/ConfigTemplates/wall-y-rev-dark.png";
import floor from "../assets/ConfigTemplates/Floor.png";
import coin from "../assets/ConfigTemplates/coin-template.png";

const getTexture = (areaKey: number) => {
  switch (areaKey) {
    case 0:
      return floor;
    case 1:
      return wallXIn;
    case 2:
      return wallXOut;
    case 3:
      return wallXCorner;
    case 4:
      return wallXCorner2;
    case 5:
      return wallY;
    case 6:
      return wallYDark;
    case 7:
      return wallYReversed;
    case 8:
      return wallYReversedDark;
    case 9:
      return coin;
    default:
      return "";
  }
};

export default getTexture;
