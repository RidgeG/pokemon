import react from 'react';
import './App.css'
import PokemonLijst from "./componenten/pokemonlijst/PokemonLijst.jsx";

function App() {

  return (
      <div>
          <h1 className="app-title">Pokémon Deck</h1>
          <PokemonLijst/>
      </div>
  )
}

export default App
