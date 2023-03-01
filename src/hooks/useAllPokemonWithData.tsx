import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import api from "../api";
import { pokemonAtom } from "../store/pokemon";

export const useAllPokemonWithData = () => {
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
