import { selectedPokemonAtom } from "../store/pokemon";
import { useAtom } from "jotai";
import { padleft } from "../common/utils";
import TypeBadge from "./TypeBadge";

export const SideBar = () => (
  <aside className="relative max-w-xs w-full">
    <ShowcasePokemon />
  </aside>
);

const ShowcasePokemon = () => {
  const [selectedPokemon] = useAtom(selectedPokemonAtom);
  if (!selectedPokemon) return null;

  return (
    <div className="sticky top-32 px-4 py-6 flex gap-4 flex-col justify-end items-center rounded-3xl bg-white">
      <img
        className="absolute max-w-[12rem] top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2"
        src={selectedPokemon.lg_image}
        alt={selectedPokemon.name}
      />
      <div className="py-10"></div>
      <span className="opacity-40 font-bold">
        N&deg;{padleft(selectedPokemon.id.toString(), 3, "0")}
      </span>
      <h2 className="font-bold capitalize text-xl">{selectedPokemon.name}</h2>
      <div className="flex gap-2">
        {selectedPokemon.types.map((t) => (
          <TypeBadge
            key={selectedPokemon.id + t.type.name}
            type={t.type.name}
          />
        ))}
      </div>
      <p className="font-sans text-center text-sm">
        {selectedPokemon.flavour_text.replace(//g, " ")}
      </p>
    </div>
  );
};
