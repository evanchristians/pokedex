import { atomWithStorage } from "jotai/utils";
import { Pokemon } from "../api/pokemon";

export const pokemonAtom = atomWithStorage<Pokemon[]>("pokemon", []);
export const selectedPokemonAtom = atomWithStorage<Pokemon | null>(
  "selectedPokemon",
  null
);
export const searchQueryAtom = atomWithStorage<string>("searchQuery", "");

