import { useAtom } from "jotai";
import { Pokemon } from "../api/pokemon";
import { padleft } from "../common/utils";
import { selectedPokemonAtom } from "../store/pokemon";
import TypeBadge from "./TypeBadge";

const PokeCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const [_, setSelectedPokemon] = useAtom(selectedPokemonAtom);
  return (
    <div
      onClick={() => {
        setSelectedPokemon(pokemon);
      }}
      className="cursor-pointer transition-shadow relative px-4 py-6 flex  flex-col justify-end items-center rounded-3xl bg-white shadow-2xl shadow-slate-200 hover:shadow-slate-300"
    >
      <img
        className="absolute pixelated top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2"
        src={pokemon.gif}
        alt={pokemon.name}
      />
      <div className="py-4"></div>
      <span className="opacity-40 text-xs font-bold">
        N&deg;{padleft(pokemon.id.toString(), 3, "0")}
      </span>
      <h2 className="font-bold capitalize text-xl mb-2 mt-1">{pokemon.name}</h2>
      <div className="flex gap-2">
        {pokemon.types.map((t) => (
          <TypeBadge key={pokemon.id + t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
};

export default PokeCard;
