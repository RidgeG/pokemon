import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./componenten/pokemonlijst/PokemonLijst.jsx";
import "./App.css";

const App = () => {
    const [offset, setOffset] = useState(0); // Houdt de huidige reeks Pokémon bij
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleNext = () => setOffset((prev) => prev + 20);
    const handlePrevious = () => setOffset((prev) => Math.max(prev - 20, 0));

    return (
        <div className="app">
            <h1>Pokémon Deck</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <PokemonList
                offset={offset}
                setLoading={setLoading}
                setError={setError}
            />

            <div className="navigation">
                <button onClick={handlePrevious} disabled={offset === 0 || loading}>
                    Vorige
                </button>
                <button onClick={handleNext} disabled={loading}>
                    Volgende
                </button>
            </div>
        </div>
    );
};

export default App;
