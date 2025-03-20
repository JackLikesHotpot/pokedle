import './App.css'
import { Pokemon, PokemonClient } from 'pokenode-ts'; // Import the Client
import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import Guess from './components/Row/Row';

function App() {

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [names, setNames] = useState<{}>();
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>();
  const [choice, setChoice] = useState<Pokemon>();

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
      console.log(response)
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
        setChoice(response)
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

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-1/3 border border-gray-300 rounded-lg shadow-lg p-2'>
      Guess the daily Pokémon! It's {pokemon?.name}.
      </div>
      {selectedOption && pokemon && choice ?
      <div>
      <Guess
        name={pokemon.name}
        id={pokemon.id}
        height={pokemon.height}
        weight={pokemon.weight}
        types={pokemon.types}
        choice={choice}
      />
      </div>
      : ''}
    <Select
      className="w-1/4 border border-gray-300 rounded-lg shadow-lg p-2"
      defaultValue={selectedOption}
      onChange={handleChoice}
      options={names as []}
      styles={customStyles}
        />
    </div>
  )
}

export default App
