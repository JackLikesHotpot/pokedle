import { useEffect, useState } from "react";
import { NamedAPIResource, PokemonClient } from "pokenode-ts";
import capitaliseFirstLetter from "../helpers/capitaliseFirstLetter";

const api = new PokemonClient();

export const usePokemonList = () => {
  const [names, setNames] = useState<{ label: string; value: string }[]>([]);useEffect(() => {
    
    const fetchPokemonList = async () => {
      try {
        const list = await api.listPokemons(0, 386);
        const options = list.results.map((pokemon: NamedAPIResource) => ({
          label: capitaliseFirstLetter(pokemon.name),
          value: pokemon.name,
        }));
        setNames(options);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonList();
  }, []);

  return { names };
};