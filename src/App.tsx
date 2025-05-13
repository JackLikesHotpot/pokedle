import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import PokemonGame from './pages/PokeGuess'; 

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/game/pokeguess" element={<PokemonGame/>} />
      </Routes>
    </Router>
  );
};

export default App;
