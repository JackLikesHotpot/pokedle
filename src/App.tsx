import './App.css'
import { useState } from 'react';
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
    <div className="flex flex-col items-center w-full h-screen justify-start bg-gray-200 fixed top-0 left-0">
      <div className="border border-gray-300 rounded-lg shadow-lg p-2 text-center mt-4">
        <h1 className='text-3xl font-pixelify'>Guess the daily Pokémon! <br/><br/> It's {pokemon?.name}.</h1>
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

<div className="w-2/3 mt-60 fixed">
  <div className="grid grid-cols-7 gap-4">
    {choices.length > 0 ? labels.map((label, index) => (
        <h4 key={index} className="text-sm w-full font-semibold sm:pl-2">{label}</h4>
    )): ''}
    
          {choices.map((choice, rowIndex) =>
          // ignores undefined
            choice ? (choice.name && (
                <Guess
                  key={rowIndex}
                  name={pokemon?.name || ""}
                  id={pokemon?.id || 0}
                  height={pokemon?.height || 0}
                  weight={pokemon?.weight || 0}
                  types={pokemon?.types || []}
                  sprite={pokemon?.sprites?.front_default || ""}  
                  choice={{...choice, sprite: choice.sprites?.front_default || ""}}
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
