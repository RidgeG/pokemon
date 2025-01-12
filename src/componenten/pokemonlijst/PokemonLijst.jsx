import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonList = ({ offset, setLoading, setError }) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [abortController, setAbortController] = useState(null);

    const fetchPokemonList = async () => {
        try {
            setLoading(true);
            setError(null);

            if (abortController) {
                abortController.abort();
            }

            const controller = new AbortController();
            setAbortController(controller);

            const { data } = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`,
                { signal: controller.signal }
            );

            const pokemonDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const { data: details } = await axios.get(pokemon.url, {
                        signal: controller.signal,
                    });
                    return {
                        name: details.name,
                        image: details.sprites.front_default,
                        abilities: details.abilities.map((ability) => ability.ability.name),
                        weight: details.weight,
                        movesCount: details.moves.length,
                    };
                })
            );

            setPokemonData(pokemonDetails);
        } catch (err) {
            if (err.name !== "CanceledError") {
                setError("Er is iets fout gegaan bij het ophalen van de Pokémon-data.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonList();

        return () => {
            if (abortController) abortController.abort();
        };
    }, [offset]);

    return (
        <div className="pokemon-grid">
            {pokemonData.map((pokemon, index) => (
                <div className="pokemon-card" key={index}>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.image} alt={pokemon.name} />
                    <p>Moves: {pokemon.movesCount}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <h3>Abilities:</h3>
                    <ul>
                        {pokemon.abilities.map((ability, idx) => (
                            <li key={idx}>{ability}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PokemonList;
