"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PokemonDetail = ({ params }) => {
  const router = useRouter();
  const { name } = params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!name) return;
    
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setPokemon(res.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Pokémon not found!</p>;

  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold capitalize text-center mb-4">{pokemon.name}</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          className="w-40 h-40 md:w-56 md:h-56 object-contain" 
        />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
          <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
          <div>
            <h3 className="font-semibold">Abilities:</h3>
            <ul>
              {pokemon.abilities.map((item, index) => (
                <li key={index} className="capitalize">{item.ability.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Types:</h3>
            <ul>
              {pokemon.types.map((item, index) => (
                <li key={index} className="capitalize">{item.type.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full text-center">
        <h3 className="font-semibold">Cries:</h3>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-2">
          {pokemon.cries?.latest && (
            <audio controls>
              <source src={pokemon.cries.latest} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          )}
          {pokemon.cries?.legacy && (
            <audio controls>
              <source src={pokemon.cries.legacy} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
      <div className="mt-6 w-full">
        <h3 className="font-semibold text-center">Moves:</h3>
        <div className="max-h-40 overflow-y-auto border p-2 rounded-lg mt-2">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {pokemon.moves.map((move, index) => (
              <li key={index} className="capitalize">{move.move.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={() => router.back()} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
        Back
      </button>
    </div>
  );
};

export default PokemonDetail;
