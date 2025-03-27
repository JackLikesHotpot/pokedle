import './App.css'
import { Pokemon, PokemonClient } from 'pokenode-ts'; // Import the Client
import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Guess from './components/Row/Row';
import { usePokemonGame } from "./hooks/usePokemonGame";
import { usePokemonList } from "./hooks/usePokemonList";
import { usePokemonFetch } from "./hooks/usePokemonFetch";

interface Option {
  label: string;
  value: string;
}

function App() {
  const { pokemon, choices, finished, setChoices } = usePokemonGame();
  const { names } = usePokemonList();
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);

  // set choices function initialised in game hook and used in fetch file
  usePokemonFetch(selectedOption?.value || null, setChoices);

  const handleChoice = (option: SingleValue<Option>) => {
    if (option) {
      setSelectedOption(option);
    }
  };
  
  const customStyles = {
    dropdownIndicator: (base: any) => ({
      ...base,
      display: 'none', 
    })
  };

  const labels = ["Sprite", "Name", "Generation", "Height", "Weight", "Type 1", "Type 2"]
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-300">
      <div className="w-1/3 border border-gray-300 rounded-lg shadow-lg p-2 text-center">
        Guess the daily Pokémon! It's {pokemon?.name}.
      </div>
      
      {finished ? '' : (
      <Select
        className="w-1/4 border border-gray-300 rounded-lg shadow-lg p-2 mt-4"
        defaultValue={selectedOption}
        onChange={handleChoice}
        options={names as []}
        styles={customStyles}
      />)
      }

      <div className="w-2/3 mt-4">
        <div className="grid grid-cols-7 gap-4 text-center font-semibold">
          {labels.map((label, index) => (
            <h4 key={index} className="text-sm">{label}</h4>
          ))}
        </div>
  
        <div className="grid grid-cols-7 gap-4">
          {choices.map((choice, rowIndex) =>
            choice ? (
              choice.name && (
                <Guess
                  key={rowIndex}
                  name={pokemon?.name || ""}
                  id={pokemon?.id || 0}
                  height={pokemon?.height || 0}
                  weight={pokemon?.weight || 0}
                  types={pokemon?.types || []}
                  sprite={pokemon?.sprites?.front_default || ""}  
                  choice={{...choice, sprite: choice.sprites?.front_default || "" // ✅ Add sprite field if missing
                  }}
                />
              )
            ) : []
          )}
        </div>
      </div>
    </div>
  );
  
  
}

export default App
