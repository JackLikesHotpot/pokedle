import './App.css'
import { PokemonClient } from 'pokenode-ts'; // Import the Client
import { useEffect } from 'react';


function App() {

  const api = new PokemonClient();

  const abc = async () => {
    try {
      const response = await api.getPokemonById(Math.floor(Math.random() * 496) + 1)
          .then((data) => console.log(data))
    }
    catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    abc();
  }, [])
  return (
    <>
    </>
  )
}

export default App
