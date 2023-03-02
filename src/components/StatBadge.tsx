type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

const shortStatNames: Record<string, string> = {
  "special-defense": "SpD",
  "special-attack": "SpA",
  defense: "DEF",
  attack: "ATK",
  speed: "SPD",
  hp: "HP",
};

const statColors: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-yellow-500",
  defense: "bg-green-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-indigo-500",
  speed: "bg-purple-500",
};

const getShortStatName = (name: string) => {
  return shortStatNames[name] || name;
};

const StatBadge = ({ stat }: { stat: Stat }) => {
  return (
    <div className="flex flex-col gap-1 items-center p-1 rounded-full bg-slate-100">
      <span
        className={`text-xs w-8 h-8 grid place-items-center font-bold rounded-full text-white ${
          statColors[stat.stat.name]
        }`}
      >
        {getShortStatName(stat.stat.name)}
      </span>
      <span className="font-bold p-1">{stat.base_stat}</span>
    </div>
  );
};

export default StatBadge;
