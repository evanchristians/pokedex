import { atomWithStorage } from "jotai/utils";

export const pokemonAtom = atomWithStorage("pokemon", []);
export const selectedPokemonAtom = atomWithStorage("selectedPokemon", null);
