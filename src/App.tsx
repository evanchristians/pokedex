import { useAtom } from "jotai";
import { Pokemon } from "./api/pokemon";
import { padleft } from "./common/utils";
import { SideBar } from "./components/SideBar";
import TypeBadge from "./components/TypeBadge";
import { useAllPokemonWithData } from "./hooks/useAllPokemonWithData";
import { selectedPokemonAtom } from "./store/pokemon";

const PokeCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const [_, setSelectedPokemon] = useAtom(selectedPokemonAtom);
  return (
    <div
      onClick={() => {
        setSelectedPokemon(pokemon);
      }}
      className="relative px-4 py-6 flex gap-4 flex-col justify-end items-center rounded-3xl bg-white shadow-2xl shadow-slate-200"
    >
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
    <main className="bg-slate-100 pt-20 px-4 flex flex-col items-center min-h-screen">
      {loading && !pokemon && <p>Loading...</p>}
      {error && !pokemon && <p>{error.message}</p>}
      {pokemon && (
        <div className="flex gap-10 w-full max-w-screen-lg">
          <div className="w-full grid grid-cols-3 gap-y-20 gap-x-8 col-span-2">
            {pokemon.map((p) => (
              <PokeCard key={p.id} pokemon={p} />
            ))}
          </div>
          <SideBar />
        </div>
      )}
    </main>
  );
}

export default App;
