import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import api from "../api";
import { pokemonAtom, searchQueryAtom } from "../store/pokemon";

export const useAllPokemonWithData = () => {
  const [pokemon, setPokemon] = useAtom(pokemonAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.pokemon
      .allWithData()
      .then(setPokemon)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);
  return {
    pokemon:
      searchQuery.length > 0
        ? pokemon.filter((p) => p.name.includes(searchQuery))
        : pokemon,
    loading,
    error,
  };
};
