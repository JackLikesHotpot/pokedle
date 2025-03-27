import { useEffect, useState } from "react";
import { Pokemon, PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export const usePokemonGame = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [choices, setChoices] = useState<Pokemon[]>([]);
  const [finished, setFinished] = useState<boolean>(false);

  // generates a random pokemon target and resets previous game
  const generateTarget = async () => {
    try {
      const response = await api.getPokemonById(Math.floor(Math.random() * 386) + 1)
      setPokemon(response)
      setChoices([])
    }
    catch (error) {
      console.log(error)
    }
  }

  // if choices reaches x numebr then mark game as finished
  useEffect(() => {
    const lastChoice = choices[choices.length - 1]
    if (lastChoice) {
      if (lastChoice?.name === pokemon?.name) {
        setFinished(true)
      }
    }

    if (choices.length === 6) {
      setFinished(true)
    }
  }, [choices, pokemon])


  // initial set up
  useEffect(() => {
    generateTarget()
  }, [])

  return {
    pokemon,
    choices,
    finished,
    setChoices
  };
};