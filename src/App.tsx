import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import PokeCard from "./components/PokeCard";
import ShowcasePokemon from "./components/ShowcasePokemon";
import { useAllPokemonWithData } from "./hooks/useAllPokemonWithData";
import { searchQueryAtom } from "./store/pokemon";

function App() {
  const { pokemon, loading, error } = useAllPokemonWithData();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  return (
    <main className="bg-slate-100 text-slate-600 px-4 flex flex-col items-center min-h-screen">
      <header className="flex justify-center w-full py-4">
        <div className="max-w-screen-xl w-full px-4">
          <img src="/pokedex.png" alt="Pokedex Logo" className="max-w-[6rem]" />
        </div>
      </header>
      <div className="p-5"></div>
      {loading && !pokemon && <p>Loading...</p>}
      {error && !pokemon && <p>{error.message}</p>}
      {pokemon && (
        <div className="flex gap-6 w-full max-w-screen-xl px-4">
          <div className="w-full grid grid-cols-3 gap-y-12 gap-x-6 col-span-2 place-content-start">
            <div className="col-span-3 flex gap-4 px-4 py-2 rounded-2xl bg-white">
              <MagnifyingGlassIcon className="w-5 text-slate-400"/>
              <input
                type="text"
                placeholder="Search..."
                className="focus:outline-none w-full"
                value={searchQuery}
                onChange={(evt) => setSearchQuery(evt.target.value)}
              />
            </div>
            {pokemon.map((p) => (
              <PokeCard key={p.id} pokemon={p} />
            ))}
          </div>
          <aside className="w-full max-w-sm">
            <ShowcasePokemon />
          </aside>
        </div>
      )}
    </main>
  );
}

export default App;
