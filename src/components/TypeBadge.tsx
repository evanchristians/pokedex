import chroma from "chroma-js";

const typesColors = {
  bug: "#A8B820",
  dark: "#705848",
  dragon: "#7038F8",
  electric: "#F8D030",
  grass: "#78C850",
  poison: "#A040A0",
  psychic: "#F85888",
  water: "#6890F0",
  fire: "#F08030",
  flying: "#A890F0",
  ghost: "#705898",
  ground: "#E0C068",
  ice: "#98D8D8",
  normal: "#A8A878",
  rock: "#B8A038",
  steel: "#B8B8D0",
  fighting: "#C03028",
  fairy: "#EE99AC",
} as const;

export type Type = keyof typeof typesColors;

const darken = (color: string) => {
  return chroma(color).darken(2).hex();
};

const lighten = (color: string) => {
  return chroma(color).brighten(1).hex();
};

const TypeBadge: React.FC<{ type: Type }> = ({ type }) => {
  return (
    <span
      className="px-2.5 py-1.5 rounded-md text-xs font-bold uppercase"
      style={{
        backgroundColor: lighten(typesColors[type]),
        color: darken(typesColors[type]),
      }}
    >
      {type}
    </span>
  );
};
export default TypeBadge;
