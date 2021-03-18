import { React, useState } from "react";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";
const URL = "http://localhost:3001/api/pokemon/";

export default function SearchArea() {
  const [inputValue, setInputValue] = useState("");
  const [pokemon, setPokemon] = useState("");

  const getPokemonDetails = async () => {
    const pokemonName = inputValue;
    setPokemon(await axios.get(`${URL}/${pokemonName}`));
  };

  const handleInput = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  return (
    <div className="search-area">
      <input
        className="search-input"
        placeholder="Search Pokémon"
        onChange={handleInput}
      ></input>
      <button className="search-button" onClick={getPokemonDetails}>
        Search
      </button>
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
}
