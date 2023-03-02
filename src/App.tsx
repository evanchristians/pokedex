import { useAtom } from "jotai";
import PokeCard from "./components/PokeCard";
import ShowcasePokemon from "./components/ShowcasePokemon";
import { useAllPokemonWithData } from "./hooks/useAllPokemonWithData";
import { searchQueryAtom } from "./store/pokemon";

function App() {
  const { pokemon, loading, error } = useAllPokemonWithData();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  return (
    <main className="bg-slate-100 text-slate-600 pt-20 px-4 flex flex-col items-center min-h-screen">
      {loading && !pokemon && <p>Loading...</p>}
      {error && !pokemon && <p>{error.message}</p>}
      {pokemon && (
        <div className="flex gap-6 w-full max-w-screen-xl px-4">
          <div className="w-full grid grid-cols-3 gap-y-12 gap-x-6 col-span-2 place-content-start">
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg shadow-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-opacity-50"
                value={searchQuery}
                onChange={(evt) => setSearchQuery(evt.target.value)}
              />
            </div>
            {pokemon.map((p) => (
              <PokeCard key={p.id} pokemon={p} />
            ))}
          </div>
          <aside className="w-full max-w-xs">
            <ShowcasePokemon />
          </aside>
        </div>
      )}
    </main>
  );
}

export default App;
