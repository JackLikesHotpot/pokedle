import './App.css'
import { Pokemon, PokemonClient } from 'pokenode-ts'; // Import the Client
import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Guess from './components/Row/Row';

function App() {

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [names, setNames] = useState<{}>();
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>();
  const [choices, setChoices] = useState<Pokemon[]>([]);
  const [finished, setFinished] = useState<boolean>(false)

  interface Pokemon {
    name: string;
    id: number;
    height: number;
    weight: number;
    types: Type[];
  }

  interface Option {
    label: string;
    value: string;
  }

  interface Type {
    slot: number;
    type: {name: string, url: string;}
  }

  const api = new PokemonClient();

  const capitalizeFirstLetter = (str: string) => {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
  }

  const generateTarget = async () => {
    try {
      const response = await api.getPokemonById(Math.floor(Math.random() * 386) + 1)
      setPokemon(response)
      const list = await api.listPokemons(0, 386)
      
      const names: Option[] = list.results.map((pokemon) => {
        const capitalized = capitalizeFirstLetter(pokemon.name);
        return { label: capitalized, value: pokemon.name }
      })
      
      setNames(names)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getPokemon = async (name: string) => {
    try {
      const response = await api.getPokemonByName(name)
      // console.log(response)
      return response
    }
    
    catch (error) {
      console.log(error)
    }
  }
  
  // weight
  // height
  // type 1
  // type 2
  // generation
  // stage
  const customStyles = {
    dropdownIndicator: (base: any) => ({
      ...base,
      display: 'none', 
    })
  };

  useEffect(() => {
    generateTarget();
  }, [])

  // check what pokemon was selected
  // useEffect(() => {
  //   console.log(pokemon)
  // }, [pokemon])


  // configure selected option to create cards and check if pokemon is correct
  useEffect(() => {
    const fetchChoice = async () => {
      if (selectedOption) {
        try {
        const response = await getPokemon(selectedOption.value)
        if (response) {
          setChoices((prevChoices) => {
            if (prevChoices.length < 6) {
              return [...prevChoices, response]
            }
            return prevChoices
          })
      }
      }
      catch (error) {
        return error
      }
    }
  }
  fetchChoice();
  }, [selectedOption])

  const handleChoice = (option: SingleValue<Option>) => {
    if (option) {
      setSelectedOption(option);
    }
  };

  useEffect(() => {
    if (choices.length === 6) {
      setFinished(true)
    }
  }, [choices])

  // useEffect(() => {
  //   console.log(choices)
  // }, [choices])
  const labels = ["Name", "ID", "Height", "Weight", "Type 1", "Type 2"]


  return (

    
    <div className="flex flex-col justify-center items-center w-full">

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

      {/* Main Grid Container */}
      <div className="w-2/3 mt-4">
        {/* Headings Row */}
        <div className="grid grid-cols-6 gap-4 text-center font-semibold">
          {labels.map((label, index) => (
            <h4 key={index} className="text-sm">{label}</h4>
          ))}
        </div>
  
        <div className="grid grid-cols-6 gap-4">
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
                  choice={choice}
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
