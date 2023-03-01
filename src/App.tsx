import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import api from "./api";
import { Pokemon } from "./api/pokemon";
import { padleft } from "./common/utils";
import TypeBadge from "./components/TypeBadge";

const pokemonAtom = atomWithStorage<Pokemon[]>("pokemon", []);

const useAllPokemonWithData = () => {
  const [pokemon, setPokemon] = useAtom(pokemonAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.pokemon
      .allWithData()
      .then(setPokemon)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  return { pokemon, loading, error };
};

const PokeCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="relative px-4 py-6 flex gap-4 flex-col justify-end items-center rounded-3xl bg-white shadow-2xl shadow-slate-300">
      <img
        className="absolute pixelated top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2"
        src={pokemon.gif}
        alt={pokemon.name}
      />
      <div className="py-2"></div>
      <span className="opacity-40 font-bold">
        N&deg;{padleft(pokemon.id.toString(), 3, "0")}
      </span>
      <h2 className="font-bold capitalize text-xl">{pokemon.name}</h2>
      <div className="flex gap-2">
        {pokemon.types.map((t) => (
          <TypeBadge key={pokemon.id + t.type.name} type={t.type.name} />
        ))}
      </div>
    </div>
  );
};

function App() {
  const { pokemon, loading, error } = useAllPokemonWithData();
  return (
    <main className="bg-slate-100 pt-20 grid grid-cols-3 gap-y-20 gap-x-8 px-4">
      {loading && !pokemon && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {pokemon.map((p) => (
        <PokeCard key={p.id} pokemon={p} /> 
      ))}
    </main>
  );
}

export default App;
