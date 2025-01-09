import React, { useState, useEffect } from 'react';
import axios from 'axios'


const PokemonCard = ({ name, image, abilities, weight, movesCount }) => {
    return (
        <div className="pokemon-card">
            <img src={image} alt={name} className="pokemon-image" />
            <h2 className="pokemon-name">{name}</h2>
            <p className="pokemon-detail"><strong>Weight:</strong> {weight}</p>
            <p className="pokemon-detail"><strong>Abilities:</strong> {abilities.join(", ")}</p>
            <p className="pokemon-detail"><strong>Moves:</strong> {movesCount}</p>
        </div>
    );
};

    const PokemonLijst= ()=> {

    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get ("https://pokeapi.co/api/v2/pokemon?limit=20");
            };

        }
    })
}