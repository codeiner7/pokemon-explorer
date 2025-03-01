"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  const getPokemons = () => {
    if (!nextUrl || loading) return;

    setLoading(true);
    axios
      .get(nextUrl)
      .then((res) => {
        setPokemons((prev) => [...prev, ...res.data.results]);
        setNextUrl(res.data.next);
        setNotFound(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemons:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchPokemon = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((res) => {
        setPokemons([{ name: res.data.name, url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/` }]);
        setNextUrl(null);
        setNotFound(false);
      })
      .catch((error) => {
        console.error("Pokemon not found:", error);
        setPokemons([]);
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearSearch = () => {
    setSearch("");
    setPokemons([]);
    setNextUrl("https://pokeapi.co/api/v2/pokemon?limit=10");
    setNotFound(false);
    getPokemons();
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="flex flex-col items-center pt-16 w-full px-4 sm:px-6 md:px-8">
      <h2 className="font-medium text-2xl pb-4 text-center">Pokemon Explorer</h2>
      
      <form onSubmit={searchPokemon} className="mb-4 flex flex-col sm:flex-row gap-2 w-full max-w-md">
        <div className="relative">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <BsSearch className="absolute right-0 top-0 mr-3 mt-3 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            onClick={clearSearch}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 cursor-pointer"
          >
            Clear
          </button>
        </div>
      </form>

      {notFound && <p className="text-red-500 font-semibold text-center">No Pokémon found! Try another search.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {pokemons.map((item, index) => (
          <PokemonCard name={item.name} key={index} url={item.url} />
        ))}
      </div>

      {nextUrl && !notFound && (
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md 
          hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
          onClick={getPokemons}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Home;
