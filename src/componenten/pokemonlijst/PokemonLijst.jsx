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
                const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");

                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const {data: details} = await axios.get(pokemon.url);
                        return {
                            name: details.name,
                            image: details.sprites.front_default,
                            abilities: details.abilities.map((ability) => ability.ability.name),
                            weight: details.weight,
                            movesCount: details.moves.length,
                        };
                    })
                );
                setPokemonList(pokemonDetails);
            } catch (error) {
                console.error("Error fetching pokemon list", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

        return (
            <div className="pokemon-container">
                {pokemonList.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        name={pokemon.name}
                        image={pokemon.image}
                        abilities={pokemon.abilities}
                        weight={pokemon.weight}
                        movesCount={pokemon.movesCount}
                    />
                ))}
            </div>
        );

};
    export default PokemonLijst;