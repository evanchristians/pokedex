import { pokemonAtom, selectedPokemonAtom } from "../store/pokemon";
import { useAtomValue, useAtom } from "jotai";
import { padleft } from "../common/utils";
import TypeBadge from "./TypeBadge";
import StatBadge from "./StatBadge";
import { useEffect, useState } from "react";
import { Pokemon } from "../api/pokemon";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";

const ShowcasePokemon = () => {
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);
  const allPokemon = useAtomValue(pokemonAtom);
  const [nextPokemon, setNextPokemon] = useState<Pokemon | null>(null);
  const [prevPokemon, setPrevPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (!selectedPokemon) {
      if (allPokemon.length > 0) {
        setSelectedPokemon(allPokemon[0]);
      }
      return;
    }
    setNextPokemon(
      allPokemon.find((p) => Number(p.id) === Number(selectedPokemon.id) + 1) ??
        null
    );
    setPrevPokemon(
      allPokemon.find((p) => Number(p.id) === Number(selectedPokemon.id) - 1) ??
        null
    );
  }, [selectedPokemon, allPokemon]);

  if (!selectedPokemon) return null;

  return (
    <div className="sticky top-32 px-2 pt-6 pb-2 flex gap-4 flex-col justify-end items-center rounded-3xl bg-white">
      <img
        className="absolute scale-[2.5] pixelated top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2"
        src={selectedPokemon.gif}
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
      <p className="font-sans text-center text-sm max-w-xs px-4">
        {selectedPokemon.flavour_text.replace(//g, " ")}
      </p>
      <h2 className="font-bold mt-4 text-sm">STATS</h2>
      <div className="flex justify-center gap-1">
        {selectedPokemon.stats.map((stat) => (
          <StatBadge key={stat.stat.name} stat={stat} />
        ))}
      </div>
      <div className="divide-slate-200 divide-x bg-slate-100 grid grid-cols-2 w-full mt-4 rounded-2xl font-bold overflow-hidden">
        {prevPokemon ? (
          <button
            className="py-4 px-2 flex items-center gap-1 capitalize text-xs w-full transition-colors hover:bg-slate-200"
            onClick={() => setSelectedPokemon(prevPokemon)}
          >
            <ArrowLeftCircleIcon className="w-5 mr-1 text-slate-400" />
            <img
              src={prevPokemon.gif}
              alt={prevPokemon.name}
              className="w-[1.6rem] aspect-square object-contain mr-1"
            />
            {prevPokemon.name}
            <span className="font-normal">
              #{padleft(prevPokemon.id.toString(), 3, "0")}
            </span>
          </button>
        ) : <div></div>}
        {nextPokemon ? (
          <button
            className="py-4 px-2 flex items-center justify-end gap-1 capitalize text-xs w-full transition-colors hover:bg-slate-200"
            onClick={() => setSelectedPokemon(nextPokemon)}
          >
            <span className="font-normal">
              #{padleft(nextPokemon.id.toString(), 3, "0")}
            </span>
            {nextPokemon.name}
            <img
              src={nextPokemon.gif}
              alt={nextPokemon.name}
              className="w-[1.6rem] aspect-square object-contain ml-1"
            />
            <ArrowRightCircleIcon className="w-5 ml-1 text-slate-400" />
          </button>
        ) : <div></div>}
      </div>
    </div>
  );
};

export default ShowcasePokemon;
