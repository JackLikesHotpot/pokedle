import { useEffect } from "react";
import { Pokemon, PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

// function takes in selectedOption and setChoices
export const usePokemonFetch = (selectedOption: string | null, setChoices: React.Dispatch<React.SetStateAction<Pokemon[]>>) => {
  useEffect(() => {
    const fetchChoice = async () => {
      if (selectedOption) {       // get selected option and get its data
        try {
          const response = await api.getPokemonByName(selectedOption);
          if (response) {         // if the selection isn't already picked then add onto choices
            setChoices((prevChoices) => {
              if (prevChoices.length < 6 && !prevChoices.some((choice) => choice.name === response.name)) {
                return [...prevChoices, response];
              }
              return prevChoices; 
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchChoice();
  }, [selectedOption]);
};
