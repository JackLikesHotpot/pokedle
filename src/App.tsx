import './App.css'
import { Pokemon, PokemonClient } from 'pokenode-ts'; // Import the Client
import { useEffect, useState } from 'react';
import Select from 'react-select';

function App() {

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [names, setNames] = useState<{}>();
  const [selectedOption, setSelectedOption] = useState(null);

  interface Pokemon {
    name: string;
    id: number;
  }

  interface Option {
    label: string;
    value: string;
  }

  const api = new PokemonClient();

  const capitalizeFirstLetter = (str: string) => {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
  }

  const abc = async () => {
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
  
  // weight
  // height
  // type
  // generation
  // name
  // stage
  const customStyles = {
    dropdownIndicator: (base: any) => ({
      ...base,
      display: 'none', 
    })
  };

  useEffect(() => {
    abc();
  }, [])

  // useEffect(() => {
  //   console.log(pokemon)
  // }, [pokemon])

  // useEffect(() => {
  //   console.log(selectedOption)
  // }, [selectedOption])

  useEffect(() => {
    console.log(pokemon)
    if (selectedOption !== null && pokemon) {
      if (pokemon.name === selectedOption['value']) {
        console.log('right')
      }
      else {
        console.log('wrong')
      }
    }
  }, [selectedOption])

  return (
    
    <div className='flex justify-center items-center'>
    <Select
      className="w-1/2 border border-gray-300 rounded-lg shadow-lg p-2"
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={names as []}
      styles={customStyles}
        />
    </div>
  )
}

export default App
