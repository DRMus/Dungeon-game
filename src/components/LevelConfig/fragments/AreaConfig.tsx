import AreaItem from "./AreaItem";
import ConfigSection from "../../Templates/ConfigSection";

interface Props {
  levelConfig: number[][];
}

const AreaConfig = (props: Props) => {
  return (
    <ConfigSection className="config flex flex-col h-5/6 w-full justify-center items-center">
      <div className="flex flex-col border-2 border-slate-700">
        {props.levelConfig.map((row, rowIndex) => (
          <div className="flex" key={rowIndex}>
            {row.map((item, itemIndex) => (
              <AreaItem key={`${rowIndex}-${itemIndex}`} areaKey={item} position={[rowIndex, itemIndex]} />
            ))}
          </div>
        ))}
      </div>
    </ConfigSection>
  );
};

export default AreaConfig;
