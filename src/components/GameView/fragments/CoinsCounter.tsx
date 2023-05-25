import coinPNG from "../../../assets/ConfigTemplates/coin-template.png";

interface Props {
  allCoins: number;
  currentCoinsCount: number;
}

const CoinsCounter = ({ allCoins, currentCoinsCount, ...props }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <img src={coinPNG} alt="Монета" className="w-8 h-6 object-cover" />
      <div className="rounded-lg w-32 h-6 relative overflow-hidden">
        <div className="bg-gradient-to-b from-zinc-200 from-30% to-zinc-400 to-100% h-full"></div>
        <div
          className="bg-gradient-to-b from-emerald-400 from-30% to-emerald-600 to-100% absolute top-0 left-0 h-full transition-all duration-500 z-20"
          style={{ width: `${(currentCoinsCount / allCoins) * 100}%` }}
        ></div>
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center z-30  mix-blend-difference">
          <p className="text-slate-500 font-medium text-sm">{`${currentCoinsCount} / ${allCoins}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinsCounter;
